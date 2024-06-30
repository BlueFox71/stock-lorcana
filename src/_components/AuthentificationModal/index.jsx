import { Button, Form, Input, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOGOUT } from "../../pages/stock/store/constants";

const AuthentificationModal = () => {
  const auth_lorcana = localStorage.getItem("auth_lorcana");
  const { authentication } = useSelector((state) => ({
    authentication: state.authentication,
  }));
  const username = localStorage.getItem("username");

  const [authenticate, setAuthenticate] = useState(true);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFinish = (values) => {
    const { identifiant, password } = values;
    if (
      ["jules", "alexis"].includes(identifiant.toLowerCase()) &&
      password === "13351"
    ) {
      dispatch({ type: LOGIN, payload: identifiant.toLowerCase() });
      form.resetFields();
      setAuthenticate(true);
    } else {
      notification.error({
        message: `Connexion erronée`,
        description: "L'identifiant ou le mot de passe est incorrect",
        placement: "topRight",
      });
      form.setFieldValue("password", null);
    }
  };

  useEffect(() => {
    if (auth_lorcana !== "true") {
      dispatch({ type: LOGOUT });
      setAuthenticate(false);
    }
  }, [dispatch, auth_lorcana, authentication]);

  return (
    <>
      <Modal
        form={form}
        title={
          <p style={{ textAlign: "center", fontSize: "25px" }}>
            Authentification
          </p>
        }
        open={
          !authenticate &&
          (auth_lorcana === "false" || !["jules", "alexis"].includes(username))
        }
        centered
        closable={false}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Identifiant"
            name="identifiant"
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre identifiant",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre mot de passe",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AuthentificationModal;
