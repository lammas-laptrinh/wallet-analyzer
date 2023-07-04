import { Button, Image, Space, Typography } from "antd";
import React from "react";
// import { useNavigate } from "react-router-dom";
import useTags from "./useTags";
import Loader from "../../component/Loader";

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

export default function Tags() {
  // const navigate = useNavigate();

  const subTitleStyles2 = { ...subTitleStyles };
  subTitleStyles2.textAlign = "left";
  const titleStyles2 = { ...titleStyles };
  titleStyles2.fontSize = "68px";

  const {
    tags,
    isLoading,
    isAllowMint,
    contextHolder,
    selectedTag,
    handleSelectedSrc,
    handleMintNFT,
  } = useTags();

  return (
    <>
      {contextHolder}
      {isLoading && <Loader />}
      <Space style={TagStyles} direction="vertical">
        <Typography.Title
          level={4}
          style={subTitleStyles}
          className="uppercase"
        >
          Digital Artist
        </Typography.Title>
        <Space.Compact block style={{ justifyContent: "center" }}>
          {/* <Typography.Text
            onClick={() => navigate(-1)}
            style={{
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            BACK
          </Typography.Text> */}
          <Typography.Title style={titleStyles} className="uppercase">
            MANAGE YOUR TAGS
          </Typography.Title>
        </Space.Compact>
        <div className="tag-image-container" style={{ display: "flex" }}>
          <Space
            style={{ width: "50%", justifyContent: "center" }}
            align="center"
            direction="vertical"
          >
            <Image
              width="100%"
              height={300}
              style={{ objectFit: "cover" }}
              src={selectedTag.src}
            />
          </Space>
          <Space direction="vertical" size={[0, 32]}>
            <span>
              <Typography.Title
                className="uppercase"
                style={{ color: "white", fontSize: 68, width: 350, margin: 0 }}
              >
                {selectedTag.title}
              </Typography.Title>
              <Typography.Text style={{ color: "white" }} className="uppercase">
                #{selectedTag.name}
              </Typography.Text>
            </span>
            <Button
              loading={!isAllowMint || isLoading}
              disabled={!isAllowMint}
              onClick={handleMintNFT}
              type="primary"
            >
              Mint NFT
            </Button>
          </Space>
        </div>

        <Space
          direction="horizontal"
          style={{ justifyContent: "flex-end", marginTop: 24 }}
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
              {tags.map((tag, index) => (
                <div
                  className="fade-in"
                  onClick={() => handleSelectedSrc(tag)}
                  key={index}
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
                  #{tag.name}
                </div>
              ))}
            </Space.Compact>
          </div>
        </Space>
      </Space>
    </>
  );
}
