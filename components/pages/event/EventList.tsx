import React, { FC } from "react";
import { EventCard } from "./EventCard";

interface EventCardProps {
  id: number;
  name: string;
  price: number;
  photo: string;
  description: string;
  date: string;
  discount?: string;
}

interface EventListProps {
  items: EventCardProps[];
}

export const EventList: FC<EventListProps> = ({ items }) => {
  const renderedItems = items.map((item) => (
    <EventCard
      id={item.id}
      key={item.id}
      name={item.name}
      price={item.price}
      photo={item.photo} // Provide fallback photo
      description={item.description}
      date={item.date}
      discount={item.discount}
    />
  ));

  return <div>{ renderedItems }</div>;
};
