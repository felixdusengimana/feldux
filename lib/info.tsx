/* eslint-disable react/no-unescaped-entities */
import me from "@/app/avatar.jpg";

export const name = "Felix Dusengimana";
export const avatar = me;
export const about = () => {
  return (
    <>
      Hey, I'm Felix. I'm the <b>Senior Software Developer at StylosConsults</b>{" "}
      where my team helps companies build their apps.
    </>
  );
};
export const bio = () => {
  return (
    <>
      I am a software developer who is enthusiastic about creating solutions for
      practical issues. My present employment is at{" "}
      <a
        href="https://www.stylosconsults.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-700 dark:text-neutral-200 hover:underline"
      >
        Stylosconsults
      </a>
      , where we assist organizations in constructing their applications.
    </>
  );
};
