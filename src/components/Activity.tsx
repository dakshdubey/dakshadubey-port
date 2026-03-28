import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./styles/Career.css";

const Activity = () => {
    const posts = [
        "https://www.linkedin.com/embed/feed/update/urn:li:share:7443203931037396993",
        "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7443313265570652160?compact=1",
        "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7417080472926711808?collapsed=1",
        "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7357469039473971200?collapsed=1",
        "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7381782550844936193?collapsed=1",
        "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7382050446049214464?collapsed=1"
    ];

    return (
        <div className="career-section section-container" id="activity">
            <div className="career-container">
                <h2>
                    Live <span>Activity</span>
                </h2>
                <div style={{ marginTop: "40px", width: "100%", maxWidth: "1200px", margin: "40px auto" }}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 2,
                            }
                        }}
                    >
                        {posts.map((url, index) => (
                            <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{
                                    width: "100%",
                                    maxWidth: "504px",
                                    borderRadius: "2rem",
                                    overflow: "hidden",
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                    backgroundColor: "white",
                                    border: "4px solid rgba(255, 255, 255, 0.1)"
                                }}>
                                    <iframe
                                        src={url}
                                        height="566"
                                        width="100%"
                                        frameBorder="0"
                                        allowFullScreen={true}
                                        title={`Embedded post ${index + 1}`}
                                        style={{ width: "100%" }}
                                    ></iframe>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Activity;
