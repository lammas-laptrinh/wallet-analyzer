import { Button, Space, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const TagStyles: React.CSSProperties = {
  width: "100%",
  padding: 18,
  height: "85vh",
  overflowY: "scroll",
};

const titleStyles: React.CSSProperties = {
  color: "white",
  margin: 0,
  textAlign: "center",
  flex: 1,
};
const subTitleStyles: React.CSSProperties = {
  color: "white",
  textAlign: "center",
  fontWeight: "500",
};

const images = [
  {
    id: "1",
    width: "40%",
    height: 350,
    title: "Mint Tone",
    src: "https://image.lexica.art/full_jpg/51179714-c528-4548-ad4a-8ab73f2d69a3",
  },
  {
    id: "2",
    width: "20%",
    height: 200,
    title: "Mint Tone",
    src: "https://image.lexica.art/full_jpg/51179714-c528-4548-ad4a-8ab73f2d69a3",
  },
  {
    id: "3",
    width: "20%",
    height: 300,
    title: "Mint Tone",
    src: "https://image.lexica.art/full_jpg/51179714-c528-4548-ad4a-8ab73f2d69a3",
  },
  {
    id: "4",
    width: "20%",
    height: 120,

    title: "Mint Tone",
    src: "https://image.lexica.art/full_jpg/51179714-c528-4548-ad4a-8ab73f2d69a3",
  },
  {
    id: "5",
    width: "20%",
    height: 210,

    title: "Mint Tone",
    src: "https://image.lexica.art/full_jpg/51179714-c528-4548-ad4a-8ab73f2d69a3",
  },
];

export default function Tags() {
  const navigate = useNavigate();
  const subTitleStyles2 = { ...subTitleStyles };
  subTitleStyles2.textAlign = "left";
  const titleStyles2 = { ...titleStyles };
  titleStyles2.fontSize = "68px";
  return (
    <Space style={TagStyles} direction="vertical">
      <Typography.Title level={4} style={subTitleStyles} className="uppercase">
        Digital Artist
      </Typography.Title>
      <Space.Compact block style={{ justifyContent: "center" }}>
        <Typography.Text
          onClick={() => navigate(-1)}
          style={{
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          BACK
        </Typography.Text>
        <Typography.Title style={titleStyles} className="uppercase">
          MANAGE YOUR TAGS
        </Typography.Title>
      </Space.Compact>
      <div className="tag-image-container" style={{ display: "flex" }}>
        {images.map((item) => {
          return (
            <div
              style={{ width: item.width, height: item.height }}
              key={item.id}
            >
              <img
                style={{ objectFit: "cover" }}
                width="100%"
                height="100%"
                src={item.src}
                alt="tags"
              />
              <Typography.Text style={{ color: "white" }} className="uppercase">
                {item.title}
              </Typography.Text>
            </div>
          );
        })}
      </div>
      <Space
        direction="horizontal"
        style={{ justifyContent: "flex-end", marginTop: 24 }}
      >
        <Space
          size={[0, 24]}
          style={{ alignItems: "flex-end" }}
          direction="vertical"
        >
          <div>
            <Typography.Title
              level={4}
              style={subTitleStyles2}
              className="uppercase"
            >
              TAGS
            </Typography.Title>
            <Space.Compact size="middle">
              {["NFT", "TOKEN","dumb"].map((tag) => (
                <div
                  style={{
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderRadius: 28,
                    padding: 6,
                    width: 80,
                    display: "flex",
                    justifyContent: "center",
                    marginRight: 12,
                    cursor: "pointer",
                  }}
                >
                  #{tag}
                </div>
              ))}
            </Space.Compact>
          </div>
          <Button type="primary">Mint NFT</Button>
        </Space>
      </Space>
    </Space>
  );
}
