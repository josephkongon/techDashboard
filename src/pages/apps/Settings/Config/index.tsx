import React from "react";
import useConfig from "@/hooks/queries/useConfig.ts";
import { Button, Flex, Image, message, Popconfirm, Spin } from "antd";
import { Card, Col } from "react-bootstrap";
import PageTitle from "@/components/PageTitle.tsx";
import { useTranslation } from "react-i18next";
import UpdateBasic from "@/pages/apps/Settings/Config/components/UpdateBasic.tsx";
import { useDisclosure } from "@/hooks/useDisclosure.ts";
import Parser from "html-react-parser";
import UpdateAboutUs from "@/pages/apps/Settings/Config/components/UpdateAboutUs.tsx";
import UpdateAboutUsImages from "@/pages/apps/Settings/Config/components/UpdateAboutUsImages.tsx";
import { useMutation } from "react-query";
import { deleteImage } from "@/service/api/config.ts";

const Config = () => {
  const { data, isFetching, refetch } = useConfig();
  const { t } = useTranslation();
  const { isOpen: editBasic, toggle: toggleBasic } = useDisclosure();
  const { isOpen: editAboutUse, toggle: toggleAboutUs } = useDisclosure();
  const { isOpen: editAboutUsImages, toggle: toggleAboutUsImages } =
    useDisclosure();

  const { isLoading, mutateAsync } = useMutation(async (id: string) =>
    deleteImage(id),
  );

  const renderItem = (name: string, value: string) => {
    return (
      <Col key={name}>
        <Flex gap={5}>
          <div>{name} :</div>
          <div>{value}</div>
        </Flex>
      </Col>
    );
  };

  return (
    <Spin spinning={isFetching}>
      <PageTitle title={"Config"} />

      <UpdateBasic toggle={toggleBasic} isOpen={editBasic} refetch={refetch} />
      <UpdateAboutUs
        toggle={toggleAboutUs}
        isOpen={editAboutUse}
        refetch={refetch}
      />
      <UpdateAboutUsImages
        toggle={toggleAboutUsImages}
        isOpen={editAboutUsImages}
        refetch={refetch}
      />

      <Col md={6} xl={4}>
        <Card className="product-box">
          <Card.Body>
            <div style={{ marginBottom: "1rem" }}>Basic info</div>
            <Col>
              {renderItem(t("email"), data?.email)}
              {renderItem(t("hotline"), data?.hotline)}
              {renderItem(t("whatsappNumber"), data?.whatsappNumber)}
              {renderItem(
                t("whatsappEnable"),
                data?.enableWhatsapp ? "True" : "False",
              )}
              {renderItem("facebook", data?.facebook)}
            </Col>
            <Flex style={{ marginTop: "10px", justifyContent: "flex-end" }}>
              <Button onClick={toggleBasic}>Update</Button>
            </Flex>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card className="product-box">
          <Card.Body>
            <div style={{ marginBottom: "1rem" }}>About us</div>
            <Col>{Parser(data?.aboutUs || "")}</Col>
            <Flex style={{ marginTop: "10px", justifyContent: "flex-end" }}>
              <Button onClick={toggleAboutUs}>Update</Button>
            </Flex>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card className="product-box">
          <Card.Body>
            <div style={{ marginBottom: "1rem" }}>About us image</div>
            <Flex style={{ flexWrap: "wrap" }}>
              {data?.configImages.map((configImage) => {
                return (
                  <Popconfirm
                    title="Delete the image"
                    description="Are you sure to delete this image?"
                    onConfirm={() => {
                      mutateAsync(configImage.id, {
                        onSuccess: (result) => {
                          message.success("Image deleted");
                          refetch();
                        },
                        onError: () => {
                          message.error("Error deleting image");
                        },
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Image
                      preview={false}
                      src={configImage?.file.originalUrl}
                      height={250}
                      width={300}
                      style={{ padding: "10px" }}
                    />
                  </Popconfirm>
                );
              })}
            </Flex>
            <Flex style={{ marginTop: "10px", justifyContent: "flex-end" }}>
              <Button onClick={toggleAboutUsImages}>Update</Button>
            </Flex>
          </Card.Body>
        </Card>
      </Col>
    </Spin>
  );
};

export default Config;
