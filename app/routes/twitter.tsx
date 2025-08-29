import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import styles from "@/styles/Twitter.module.scss";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
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
import { usePrevious } from "@mantine/hooks";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";

export async function loader({ context }: LoaderFunctionArgs) {
  return json({
    birthday: context.cloudflare.env.BIRTHDAY,
  });
}

const sections = ["#about", "#faves", "#rules"];
type Section = (typeof sections)[number];

function Tooltip({
  children,
  tooltipText,
}: {
  children: ReactElement | string;
  tooltipText: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className={styles.tooltipContainer}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}{" "}
      <div
        className={clsx(
          styles.tooltip,
          showTooltip ? styles.showTooltip : styles.hideTooltip,
        )}
      >
        {tooltipText}
      </div>
    </span>
  );
}

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
            width={200} height="auto"
          />
          <p>
            <strong>niki shiina</strong> is currently my biggest comfort
            character and i love him so much!! i lovemail him{" "}
            <strong>a lot</strong> so heed with caution. if you also love him
            then we are automatically best friends, i don&apos;t make the rules here!
          </p>
          <ul>
            <li><strong>other favorites: </strong>rinne, mayoi, tomoya, kohaku, tetora, makoto</li>
            <li><strong>favorite enstars ships:</strong> <em>rinniki (switch=OK)</em>, kohaai, hikari dorm, hiiteto</li>
          </ul>
          <img src="https://umamusu.wiki/w/images/b/b4/100042.png" alt="my dotter" width={200} height="auto" />
          <p>i also started playing uma musume recently and i ADORE <strong>matikanefukukitaru</strong>!! she is my fortune&apos;s smile ^u^ and i will always hype her up!<br />
          <strong>other umas i like: </strong>vodka, daitaku helios, narita brian, BNW</p>
          <ul>
            <li>
              <strong>other things i like</strong> tetro danganronpa, pokemon, animal crossing,
              cookie clicker, sanrio, webtoons
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
              i softblock to break mutuals <strong>very</strong> liberally, it&apos;s
              usually to curate my space and is almost never personal + i&apos;m okay
              with refollowing
            </li>
            <li>
              that being said, i&apos;d appreciate if mutuals could softblock to
              break the mutual
            </li>
            <li>
              i swear <strong>A LOT</strong>
            </li>
            <li>
              notifs are on for followers only and even then twitter doesn&apos;t
              show me every notif. most functional website
            </li>
            <li>
              i&apos;m very shy and am afraid of people on twitter so i don't reply
              to most replies (even my own friends...) but i&apos;ll always like
              replies i see ^.^
            </li>
            <li>
              <strong>i do not offer coding help!!</strong> i don&apos;t have time
              T__T
            </li>
          </ul>
          <h3>strict rules</h3>
          <ul>
            <li>
              <strong>
                do not interact if you think racism/colorism isn&apos;t a big deal,
                undermine/harass those who call out racism either in enstars or
                the fandom, or prioritize the feelings of fictional characters
                over real poc.
              </strong>{" "}
              i want nothing to do with you and nothing i make will ever be for
              you
            </li>
            <li>
              <strong>i really don&apos;t like rinhime</strong> and i mute/block
              people who ship it. poly rinnikihime is fine for me tho
            </li>
            <li>
              i am uncomfortable with incest and loli/shotacons. i will never
              harass anyone over this, but i will exercise my right to block and
              move on
            </li>
            <li>
              i will block/mute you if you attack people for sharing their
              harmless opinions
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
          <div className={styles.contentAboutBasics}>
            <ContentPill icon={<IconSignature />} text="son" />
            <ContentPill
              icon={<IconZodiacAries />}
              text={`${computeAge(birthday)} years old`}
            />
            <ContentPill icon={<IconCircleCheck />} text="she/he" />
          </div>
          <div className={styles.contentAboutMore}>
            <div className={styles.moreWord}>black</div>
            <div className={styles.moreWord}>
              <Tooltip tooltipText="i'm so DEI you wouldn't even get it">
                queer
              </Tooltip>
            </div>
            <div className={styles.moreWord}>infj</div>
            <div className={styles.moreWord}>3w4</div>
          </div>
          <ul>
            <li>coder by day, world&apos;s worst nikiP by night</li>
            <li>
              novice cosplayer
            </li>
            <li>transit enthusiast</li>
          </ul>
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
    <a href={url} target="_blank" rel="noreferrer" className={styles.carrdFooterPill}>
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
  const [direction, setDirection] = useState(0);

  const { data: latestCommitDate, isPending: isCommitDatePending } = useQuery({
    queryKey: ["github", "latest commit date"],
    queryFn: async () => {
      const latestCommitResponse = await fetch(
        "https://api.github.com/repos/hellogirls-js/hellogirls-info/commits?per_page=1&path=app/routes/twitter.tsx",
      );
      const latestCommit: any[] = await latestCommitResponse.json();
      return latestCommit[0].commit.author.date;
    },
  });

  const lastUpdatedDate = latestCommitDate
    ? dayjs(latestCommitDate)
    : undefined;

  const [selectedSection, setSelectedSection] = useState<Section>(
    hash.length > 0 ? hash : "#about",
  );
  const previousHash = usePrevious(hash);

  useEffect(() => {
    if (sections.indexOf(hash) >= 0) setSelectedSection(hash);
  }, [hash]);

  const sectionName = hash.slice(1);

  useEffect(() => {
    if (sections.indexOf(hash) < 0) setSelectedSection("#about");
    navigate({ hash: selectedSection });
    if (previousHash) {
      if (sections.indexOf(hash) < sections.indexOf(previousHash)) {
        setDirection(1);
      } else {
        setDirection(-1);
      }
    }
  }, [selectedSection]);

  const sectionIndex = sections.indexOf(selectedSection);

  if (isCommitDatePending)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Loading...</h1>
      </div>
    );

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
                  key={section}
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
                style={{
                  transform: `translateX(${(sectionIndex < 0 ? 0 : sectionIndex) * 100}%)`,
                }}
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
            <div className={styles.carrdFooterGrid}>
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
            </div>

            <div className={styles.carrdFooterUpdateDate}>
              {lastUpdatedDate &&
                `last updated ${lastUpdatedDate
                  .format("MMMM D, YYYY [at] h:MMa")
                  .toLowerCase()}`}
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
