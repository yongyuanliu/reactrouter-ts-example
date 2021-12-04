/**
 * react
 */
import VisuallyHidden from '@reach/visually-hidden';
import { brands, filterByBrand, getSneakerById, SNEAKERS } from './sneaker';
import React from 'react';
import { Outlet, Route, Routes, useParams } from 'react-router';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';

import "./app.css";

export default function App() {
    return (
        <div>
            <h1>Custom Filter Link Example</h1>

            <p>
                This example demonstrates how to create a "filter link" like one that is
                commonly used to filter a list of products on an e-commerce website. The
                <code>&lt;BrandLink&gt;</code> component is a custom{" "}
                <code>&lt;Link&gt;</code> that knows whether or not it is currently
                "active" by what is in the URL query string.
            </p>

            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<SneakerGrid />}></Route>
                    <Route path="/sneakers/:id" element={<SneakerView />}></Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
}


interface BrandLinkProps extends Omit<LinkProps, "to"> {
    brand: string
}

function BrandLink({ brand, children, ...props }: BrandLinkProps) {
    let [searchParams] = useSearchParams();
    let isActive = Object.is(searchParams.get("brand"), brand);
    return (
        <Link to={`/?brand=${brand}`}
            {...props}
            style={{ ...props, color: isActive ? "red" : "black" }}>
            {children}
        </Link>
    );
}

function Layout() {
    return (
        <div>
            <nav>
                <h3>Filter by brand</h3>
                <ul>
                    <li><Link to="/">All</Link></li>
                    {
                        brands.map(brand =>
                            <li key={brand}>
                                <BrandLink brand={brand}>{brand}</BrandLink>
                            </li>
                        )
                    }
                </ul>
            </nav>

            <hr />

            <Outlet />
        </div>
    );
}

function SneakerGrid() {
    let [searchParmas] = useSearchParams();
    let brand = searchParmas.get("brand");

    const sneakers = React.useMemo(() => {
        if (!brand) return SNEAKERS;
        return filterByBrand(brand);
    }, [brand]);

    return (
        <main>
            <h2>Sneakers</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "12px 24px"
            }}>
                {
                    sneakers.map(snkr => {
                        let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
                        return (
                            <div key={snkr.id} style={{ position: "relative" }}>
                                <img width={200} height={200} src={snkr.imageUrl} alt={name}
                                    style={{
                                        borderRadius: "8px",
                                        width: "100%",
                                        height: "auto",
                                        aspectRatio: "1 / 1"
                                    }} />
                                <Link
                                    style={{ position: "absolute", inset: 0 }}
                                    to={`/sneakers/${snkr.id}`}>
                                    <VisuallyHidden>{name}</VisuallyHidden>
                                </Link>
                                <div>
                                    <p>{name}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </main>
    );
}

function SneakerView() {
    let { id } = useParams<"id">();
    if (!id) {
        return <NoMatch />;
    }
    let snkr = getSneakerById(id);
    if (!snkr) {
        return <NoMatch />;
    }

    let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
    return (
        <div>
            <h2>${name}</h2>
            <img width={400} height={400}
                style={{
                    borderRadius: "8px",
                    maxWidth: "100%",
                    aspectRatio: "1 / 1"
                }}
                src={snkr.imageUrl}
                alt={name}
            />
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
