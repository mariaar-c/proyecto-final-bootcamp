import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "./CategoryCard";
import "../../style/style.css";

export default function CategoryCardList({ onCategorySelect }) {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: true,
    pauseOnHover: true,
  };

  const foodCategory = [
    { text: "Mexicana", emoji: "🌮" },
    { text: "Italiana", emoji: "🍝" },
    { text: "Japonesa", emoji: "🍣" },
    { text: "Burger", emoji: "🍔" },
    { text: "Raciones", emoji: "🥘" },
  ];

  return (
    <div className="category-card-list-component">
      <div className="container">
        <h2>¿Qué te apetece comer hoy? 😋</h2>
      </div>

      <div className="container categories-carousel">
        <div className="slider-container">
          <Slider {...settings}>
            {foodCategory.map((category, index) => (
              <CategoryCard
                key={index}
                category={category}
                onClick={() => onCategorySelect(category.text)} // Llama directamente a la función pasada como prop
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
