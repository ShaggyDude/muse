import React from "react";
import { Button } from "./button";
import { Card } from "./card";

interface ComponentExample {
  name: string;
  component: React.ReactNode;
}

export interface ComponentMeta {
  title: string;
  component: React.FC<any> | React.ComponentClass<any>;
  examples: ComponentExample[];
}

export const componentsMeta: ComponentMeta[] = [
  {
    title: "Buttons",
    component: Button,
    examples: [
      { name: "Default", component: <Button variant="default">Default</Button> },
      { name: "Destructive", component: <Button variant="destructive">Destructive</Button> },
      { name: "Outline", component: <Button variant="outline">Outline</Button> },
      { name: "Secondary", component: <Button variant="secondary">Secondary</Button> },
      { name: "Ghost", component: <Button variant="ghost">Ghost</Button> },
      { name: "Link", component: <Button variant="link">Link</Button> },
      { name: "Disabled", component: <Button disabled>Disabled</Button> },
    ],
  },
  {
    title: "Cards",
    component: Card,
    examples: [
      {
        name: "Simple Card",
        component: (
          <Card>
            <h3 className="text-2xl">Simple Card</h3>
            <p>This is a basic card component.</p>
          </Card>
        ),
      },
      {
        name: "Inverted Card",
        component: (
          <Card className="bg-blue-900 text-blue-50">
            <s className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-sm"></s>
            <h3 className="text-2xl">Inverted Card</h3>
            <p>This card has different styling.</p>
          </Card>
        ),
      },
            {
        name: "Inverted Card2",
        component: (
          <Card className="">
            <b className="bg-sky-900 text-sky-50">
                <s className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-sm"></s>
                <h3 className="text-2xl">Inverted Card</h3>
                <p>This card has different styling.</p>
            </b>
          </Card>
        ),
      },
    ],
  },
  // A future script would automatically add more components here.
];

