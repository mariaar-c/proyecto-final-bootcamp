import { Card } from "react-bootstrap";

export default function CategoryCard({ category, onClick }) {
  return (
    <Card className="text-center" onClick={onClick}>
      <Card.Body>
        <Card.Text>
          {category.text} <span>{category.emoji}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
