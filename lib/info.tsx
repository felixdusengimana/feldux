/* eslint-disable react/no-unescaped-entities */
import me from "@/app/avatar.png";

export const name = "Felix Dusengimana";
export const avatar = me;
export const about = () => {
  return (
    <>
      Hey 👋, I'm Felix. I'm the <b>Software Engineer</b>
      <br />
      You can reach me at{" "}
      <a
        href="mailto:info@feldux.com"
        className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
      >
        info@feldux.com
      </a>
    </>
  );
};
export const bio = () => {
  return (
    <>
      I am a software engineer who is enthusiastic about creating solutions for
      practical issues.
    </>
  );
};
