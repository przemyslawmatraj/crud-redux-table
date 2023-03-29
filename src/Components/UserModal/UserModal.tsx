import Modal from "antd/es/modal/Modal";
import { Key, useState, useEffect } from "react";
import { Form, Button, Input, DatePicker } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addUser, editUser } from "../../features/userTable/userTableSlice";
import { selectCurrentLanguage } from "../../features/internationalization/internationalizationSlice";
import {
  type Control,
  type FieldErrors,
  type FieldError,
  useForm,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Typography, message } from "antd";
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
  buttonIcon,
}: {
  defaultValues?: FormValues;
  userKey?: Key;
  buttonIcon?: JSX.Element;
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
  const [messageApi, contextHolder] = message.useMessage();

  const { locale } = useAppSelector(selectCurrentLanguage);
  const intl = useIntl();

  const showModal = () => {
    reset();
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = (data: UserType) => {
    if (userKey) {
      dispatch(editUser(data));
      messageApi.success(
        <FormattedMessage
          id="message.editUser.success"
          values={{ name: data.name }}
        />
      );
    }
  };

  const handleAdd = (data: UserType) => {
    messageApi.success(
      <FormattedMessage
        id="message.addUser.success"
        values={{ name: data.name }}
      />
    );
    dispatch(addUser(data));
  };

  const onSubmit = (data: FormValues) => {
    const newUser = {
      key: userKey || uuidv4(),
      name: data.name,
      age: data.age,
      dateOfBirth: JSON.stringify(data.dateOfBirth),
      bio: data.bio,
    };
    defaultValues ? handleEdit(newUser) : handleAdd(newUser);
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
      {contextHolder}
      <Button
        type="primary"
        {...(defaultValues && { type: "default", size: "small" })}
        onClick={showModal}
        icon={buttonIcon}
      >
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
          <FormInput
            name="name"
            labelId="table.name"
            control={control}
            errors={errors}
          />

          <FormInput
            name="age"
            labelId="table.age"
            inputType="number"
            control={control}
            errors={errors}
          />

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
                    placeholder={intl.formatMessage({
                      id: "table.dateOfBirth",
                    })}
                    format={locale === "enUS" ? "MM/DD/YYYY" : "DD/MM/YYYY"}
                  />
                );
              }}
            />
            <ErrorMessage error={errors.dateOfBirth} />
          </Form.Item>
          <FormInput
            name="bio"
            labelId="table.bio"
            control={control}
            errors={errors}
            inputType="textarea"
            requierd={false}
          />

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

const ErrorMessage = ({ error }: { error: FieldError | undefined }) => {
  if (!error) return null;

  return (
    <Text type="danger">
      <FormattedMessage id={error.message?.toString()} />
    </Text>
  );
};

const FormInput = ({
  name,
  labelId,
  inputType = "text",
  control,
  errors,
  requierd = true,
}: {
  name: "name" | "age" | "bio";
  labelId: string;
  inputType?: string;
  requierd?: boolean;
  control: Control<{
    bio?: string | undefined;
    name: string;
    age: number;
    dateOfBirth: Date;
  }>;
  errors: FieldErrors<{
    bio?: string | undefined;
    name: string;
    age: number;
    dateOfBirth: Date;
  }>;
}) => {
  const intl = useIntl();
  return (
    <Form.Item label={<FormattedMessage id={labelId} />} required={requierd}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          const InputComponent = inputType === "textarea" ? TextArea : Input;
          return (
            <InputComponent
              value={value}
              type={inputType}
              placeholder={intl.formatMessage({
                id: labelId,
              })}
              onChange={(e) => onChange(e.target.value)}
            />
          );
        }}
      />

      <ErrorMessage error={errors[name]} />
    </Form.Item>
  );
};

export default UserModal;
