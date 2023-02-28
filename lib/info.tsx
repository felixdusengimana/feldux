/* eslint-disable react/no-unescaped-entities */
import me from '@/app/avatar.jpg';

export const name = 'Felix Dusengimana';
export const avatar = me;
export const about = () => {
  return (
    <>
      Hey, I'm Felix. I'm the <b>Lead Software Developer at StylosConsults</b> where my
      team helps companies build their apps.
    </>
  );
};
export const bio = () => {
  return (
    <>
        I'm a software developer with a passion for building products that solve
        real-world problems. I'm currently working on{' '}
        <a
            href="https://www.stylosconsults.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 dark:text-neutral-200 hover:underline"
        >
            Stalosconsults
        </a>
        , a company that helps companies build their apps.
    </>
  );
};