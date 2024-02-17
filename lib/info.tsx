/* eslint-disable react/no-unescaped-entities */
import me from "@/app/avatar.jpg";

export const name = "Felix Dusengimana";
export const avatar = me;
export const about = () => {
  return (
    <>
      Hey 👋, I'm Felix. I'm the <b>Software Developer</b><br/>
      You can reach me at <a href="mailto:info@feldux.com" className="text-blue-400 underline hover:text-blue-800">info@feldux.com</a>
    </>
  );
};
export const bio = () => {
  return (
    <>
      I am a software developer who is enthusiastic about creating solutions for
      practical issues.
    </>
  );
};
