import { Space } from "antd";
import { SpaceSize } from "antd/es/space";
import { ReactNode } from "react";

type SectionProps = {
  title: string;
  children?: ReactNode;
  size?: SpaceSize | [SpaceSize, SpaceSize];
};

const titleStyles: React.CSSProperties = {
  color: "white",
  margin: 8,
};

const contentStyles: React.CSSProperties = {
  overflowX: "auto",
  width: "100%",
  height:"100%"
};

export default function Section({
  title,
  children,
  size = [8, 16],
}: SectionProps) {
  return (
    <section>
      <h2 style={titleStyles}>{title}</h2>
      <Space className="section-content" style={contentStyles} size={size}>
        {children}
      </Space>
    </section>
  );
}
