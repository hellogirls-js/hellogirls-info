import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import styles from "@/styles/Twitter.module.scss";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  IconAt,
  IconBrandTwitter,
  IconCircleCheck,
  IconCode,
  IconSignature,
  IconZodiacAries,
} from "@tabler/icons-react";
import { computeAge } from "@/utilities";
import clsx from "clsx";

export function loader({ context }: LoaderFunctionArgs) {
  return json({ birthday: context.cloudflare.env.BIRTHDAY });
}

const sections = ["#about", "#faves", "#rules"];
type Section = (typeof sections)[number];

function ContentPill({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className={styles.contentPill}>
      <div className={styles.contentPillIcon}>{icon}</div>
      <div className={styles.contentPillText}>{text}</div>
    </div>
  );
}

function SectionContent({
  section,
  birthday,
}: {
  section: string;
  birthday: string;
}) {
  switch (section) {
    case "faves":
      return (
        <>
          <img
            src="https://static.wikia.nocookie.net/ensemble-stars/images/4/4c/ES2_Third_Anniversary_Set_2_Niki.png"
            alt="my love"
          />
          <p>
            <strong>niki shiina</strong> is currently my biggest comfort
            character and i love him so much!! i lovemail him{" "}
            <strong>a lot</strong> so heed with caution. if you also love him
            then we are automatically best friends, i don't make the rules here!
          </p>
          <ul>
            <li>
              <strong>other favorite characters</strong> rinne, mayoi, tomoya,
              tetora, makoto
            </li>
            <li>
              <strong>favorite ships</strong> <em>rinniki</em> (switch=OK!),
              kohaai, hiiteto
            </li>
          </ul>
          <p style={{ fontSize: "0.9rem" }}>
            <strong>note!</strong> rinniki is my favorite ship in enstars and i
            pretty monoship rinne with niki (with one exception)! however, i
            don't monoship niki with anyone and dabble in other niki ships here
            and there. these ships include nikihime, kuroniki, nazuniki,
            yuzuniki, and natsuniki.
          </p>
          <ul>
            <li>
              <strong>other things i like:</strong> pokemon, animal crossing,
              cookie clicker, sanrio
            </li>
          </ul>
        </>
      );
    case "rules":
      return (
        <>
          <h3>before you follow...</h3>
          <ul>
            <li>
              i softblock to break mutuals <strong>very</strong> liberally, it's
              usually to curate my space and is almost never personal (i don't
              like muting mutuals it feels rude)
            </li>
            <li>
              that being said, i'd appreciate if mutuals could softblock to
              break the mutual
            </li>
            <li>
              i swear <strong>A LOT</strong>
            </li>
            <li>
              notifs are on for followers only and even then twitter doesn't
              show me every notif. most functional website
            </li>
            <li>
              i'm very shy and am afraid of people on twitter so i don't reply
              to most replies (even my own friends...) but i'll always like
              replies i see ^.^
            </li>
            <li>
              <strong>i do not offer coding help!!</strong> i don't have time
              T__T
            </li>
          </ul>
          <h3>strict rules</h3>
          <ul>
            <li>
              <strong>
                do not interact if you think racism/colorism isn't a big deal,
                undermine/harass those who call out racism either in enstars or
                the fandom, or prioritize the feelings of fictional characters
                over real poc.
              </strong>{" "}
              i want nothing to do with you and nothing i make will ever be for
              you
            </li>
            <li>
              i am uncomfortable with incest and loli/shotacons, i don't
              identify as an anti and i will never harass anyone over this, but
              i will exercise my right to block and move on
            </li>
            <li>
              i will block/mute you if you attack people for sharing their
              harmless opinions
            </li>
            <li>
              <strong>
                rinhime is a strong notp of mine and i do anything i can to
                avoid it.
              </strong>
            </li>
            <li>
              <strong>
                Involve me in discourse and it will be the last thing you do.
              </strong>
            </li>
          </ul>
        </>
      );
    default:
      return (
        <>
          <p>
            <div className={styles.contentAboutBasics}>
              <ContentPill icon={<IconSignature />} text="son" />
              <ContentPill
                icon={<IconZodiacAries />}
                text={`${computeAge(birthday)} years old`}
              />
              <ContentPill icon={<IconCircleCheck />} text="she/he" />
            </div>
            <ul>
              <li>black and queer</li>
              <li>coder by day, world's worst nikiP by night</li>
              <li>
                ENGstars player since <strong>june 2022</strong>
              </li>
              <li>transit enthusiast</li>
            </ul>
          </p>
        </>
      );
  }
}

function FooterPill({
  icon,
  text,
  url,
}: {
  icon: ReactNode;
  text: string;
  url: string;
}) {
  return (
    <a href={url} target="_blank" className={styles.carrdFooterPill}>
      <div className={styles.carrdFooterPillIcon}>{icon}</div>
      <div className={styles.carrdFooterPillText}>{text}</div>
    </a>
  );
}

export default function Twitter() {
  const env = useLoaderData<typeof loader>();
  const birthdayRef = useRef(env.birthday as string);
  const { hash } = useLocation();
  const navigate = useNavigate();
  console.log({ hash });

  const [selectedSection, setSelectedSection] = useState<Section>(
    hash.length === 0 ? hash : "#about",
  );
  const sectionName = hash.slice(1);

  useEffect(() => {
    if (sections.indexOf(hash) < 0) setSelectedSection("#about");
    navigate({ hash: selectedSection });
  }, [selectedSection]);

  const sectionIndex = sections.indexOf(selectedSection);

  return (
    <div className={styles.carrdPage}>
      <main className={styles.carrdContainer}>
        <header className={styles.carrdHeader}>
          <div className={styles.carrdHeaderBanner} />
          <div className={styles.carrdHeaderIcon} />
        </header>
        <div className={styles.carrdContentContainer}>
          <nav className={styles.carrdContentTabsContainer}>
            <div className={styles.carrdContentTabs}>
              {sections.map((section) => (
                <button
                  className={clsx(
                    styles.carrdContentTabButton,
                    selectedSection === section && styles.selected,
                  )}
                  onClick={() => setSelectedSection(section)}
                >
                  {section.slice(1)}
                </button>
              ))}
              <div
                className={styles.tabBg}
                style={{ transform: `translateX(${sectionIndex * 100}%)` }}
              />
            </div>
          </nav>
          <section
            className={clsx(
              styles.carrdContent,
              sectionIndex === sections.length - 1 && styles.removeRadius,
            )}
          >
            <h2>{sectionName}</h2>
            <SectionContent
              section={sectionName}
              birthday={birthdayRef.current}
            />
          </section>
          <footer className={styles.carrdFooter}>
            <FooterPill
              icon={<IconBrandTwitter />}
              text="HELLOGlRLS"
              url="https://twitter.com/helloglrls"
            />
            <FooterPill
              icon={<IconCode />}
              text="hellogirls_DEV"
              url="https://twitter.com/hellogirls_DEV"
            />
            <FooterPill
              icon={<IconAt />}
              text="niki"
              url="https://stars.ensemble.moe/@niki"
            />
          </footer>
        </div>
      </main>
    </div>
  );
}
