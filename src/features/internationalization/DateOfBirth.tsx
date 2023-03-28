import { useAppSelector } from "../../app/hooks";
import { selectCurrentLanguage } from "../internationalization/internationalizationSlice";

const DateOfBirth = ({ date }: { date: Date }) => {
  const language = useAppSelector(selectCurrentLanguage);
  const formattedLocale =
    language.locale.slice(0, 2) + "-" + language.locale.slice(2);

  return (
    <>
      {new Intl.DateTimeFormat(formattedLocale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)}
    </>
  );
};

export default DateOfBirth;
