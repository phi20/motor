// AsideFilter.js
import {
    FilterList,
    FilterListItem,
    useGetList,
} from 'react-admin';
import {
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import { useMemo } from 'react';

const Aside = () => {

    // 获取品牌、系列、减速器类型
    const { data: brands, isLoading: loadingBrands } = useGetList('brands');
    const { data: series, isLoading: loadingSeries } = useGetList('series');
    const { data: reducerTypes, isLoading: loadingReducers } = useGetList('reducer-types');

    // 将 series 按 brand 分组
    const seriesByBrand = useMemo(() => {
        const map = {};
        if (series) {
            series.forEach((s) => {
                const bid = s.brand?.id;
                if (!bid) return;
                if (!map[bid]) map[bid] = [];
                map[bid].push(s);
            });
        }
        return map;
    }, [series]);

    return (
        <Card
            sx={{
                display: { xs: 'none', md: 'block' },
                order: -1,
                width: '16em',
                mr: 2,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{ pt: 1 }}>
                <Typography variant="h6" gutterBottom></Typography>

                {/* Brand + Series */}
                <FilterList label="Brand / Series" icon={<BusinessIcon />}>
                    {loadingBrands || loadingSeries ? (
                        <CircularProgress size={20} />
                    ) : (
                        brands.map((brand) => (
                            <div key={brand.id}>
                                <FilterListItem
                                    label={brand.name}
                                    value={{ brand: brand.id, series: undefined }}
                                    key={`brand-${brand.id}`}
                                />
                                {(seriesByBrand[brand.id] || []).map((s) => (
                                    <FilterListItem
                                        label={`↳ ${s.name}`}
                                        value={{ brand: brand.id, series: s.id }}
                                        key={`series-${s.id}`}
                                    />
                                ))}
                            </div>
                        ))
                    )}
                </FilterList>

                {/* Reducer Type */}
                <FilterList label="Reducer Type" icon={<CategoryIcon />}>
                    {loadingReducers ? (
                        <CircularProgress size={20} />
                    ) : (
                        <>
                            {reducerTypes.map((r) => (
                                <FilterListItem
                                    label={r.name}
                                    value={{ reducer_type: r.id }}
                                    key={`rtype-${r.id}`}
                                />
                            ))}
                        </>
                    )}
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
