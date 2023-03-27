import Modal from "antd/es/modal/Modal";
import { Key, useState, useEffect } from "react";
import { Form, Button, Input, DatePicker } from "antd";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUser, editUser } from "../../features/userTable/userTableSlice";
import { selectCurrentLanguage } from "../../features/internationalization/internationalizationSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography } from "antd";
import type { UserType } from "../../features/userTable/userTableSlice";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;
const { TextArea } = Input;

const schema = yup.object().shape({
  name: yup.string().required("form.required.errorMessage"),
  age: yup
    .number()
    .required("form.required.errorMessage")
    .typeError("form.number.errorMessage"),
  dateOfBirth: yup
    .date()
    .required("form.required.errorMessage")
    .typeError("form.date.errorMessage"),
  bio: yup.string().max(250, "form.maxSize.errorMessage").optional(),
});

type FormValues = yup.InferType<typeof schema>;

const UserModal = ({
  defaultValues,
  userKey,
}: {
  defaultValues?: UserType;
  userKey?: Key;
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: defaultValues || undefined,
  });

  const { locale } = useAppSelector(selectCurrentLanguage);

  const showModal = () => {
    reset();
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = (data: FormValues) => {
    if (userKey) {
      const newUser = { ...data, key: userKey };
      dispatch(editUser(newUser));
    }
  };

  const handleAdd = (data: FormValues) => {
    const newUser = { ...data, key: uuidv4() };
    dispatch(addUser(newUser));
  };

  const onSubmit = (data: FormValues) => {
    defaultValues ? handleEdit(data) : handleAdd(data);
    reset();
    setVisible(false);
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <FormattedMessage id={defaultValues ? "button.edit" : "button.add"} />
      </Button>
      <Modal
        title={
          <FormattedMessage
            id={defaultValues ? "modal.title.editUser" : "modal.title.addUser"}
            values={{ name: defaultValues?.name }}
          />
        }
        open={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onSubmitCapture={handleSubmit(onSubmit)} layout="vertical">
          <Form.Item
            label={<FormattedMessage id="table.name" />}
            labelCol={{ span: 4 }}
            required
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Name"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.name && (
              <Text type="danger">
                <FormattedMessage id={errors.name.message?.toString()} />
              </Text>
            )}
          </Form.Item>
          <Form.Item label={<FormattedMessage id="table.age" />} required>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Age"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors.age && (
              <Text type="danger">
                <FormattedMessage id={errors.age.message?.toString()} />
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="table.dateOfBirth" />}
            required
          >
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    onChange={onChange}
                    value={value ? dayjs(value) : undefined}
                    placeholder="Date of Birth"
                    format={locale === "enUS" ? "MM/DD/YYYY" : "DD/MM/YYYY"}
                  />
                );
              }}
            />
            {errors.dateOfBirth && (
              <Text type="danger">
                <FormattedMessage id={errors.dateOfBirth.message?.toString()} />
              </Text>
            )}
          </Form.Item>
          <Form.Item label={<FormattedMessage id="table.bio" />}>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Bio"
                  onChange={(e) => field.onChange(e.target.value)}
                  defaultValue={defaultValues?.bio}
                />
              )}
            />
            {errors.bio && (
              <Text type="danger">
                <FormattedMessage
                  id={errors.bio.message?.toString()}
                  values={{
                    max: 250,
                  }}
                />
              </Text>
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit">
            <FormattedMessage
              id={defaultValues ? "button.edit" : "button.add"}
            />
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
