import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
import { getDataHook } from "../context/DataContext";

const Carousel = () => {
    const { data, fetchAllProducts } = getDataHook();
    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]); // ✅ safe dependency

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {
                data?.slice(0, 7).map((item, index) => {
                    return (
                        <div key={index} className="bg-gray-600 h-[500px]">
                            <Container>
                                <div className="flex gap-1 w-100% py-10">
                                    <div className="w-50 flex flex-col justify-center">
                                        <span className="text-white text-uppercase">{item.category}</span>
                                        <h1 className="line-clamp-2 text-white">{item.title}</h1>
                                        <p className="line-clamp-4 text-white">{item.description}</p>
                                        <p className="text-2xl font-bold text-white">${item.price}</p>
                                    </div>
                                    <div className="w-50 flex justify-center">
                                        <img src={item.image} alt={item.title} className="w-[400px] h-[400px] p-6 object-contain rounded-full bg-white" />
                                    </div>

                                </div>
                            </Container>
                        </div>
                    )
                })
            }
        </Slider>
    );
};

export default Carousel;
