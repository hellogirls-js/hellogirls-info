import { ReactNode, useContext } from "react";
import dayjs from "dayjs";

import styles from "@/styles/Cat.module.scss";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import MainLayout from "@/layouts/MainLayout";
import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/cloudflare";

const MOOMOO_DAY = "2018-10-20";
const MOOMOO_DEATH = "2026-07-13";

export const meta: MetaFunction = () => {
	return [
		{ title: "about moo moo" },
		{ name: "description", content: "moo moo is my cute little cat" },
	];
};

function WikiLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<Link
			to={`https://en.wikipedia.org/wiki/${href}`}
			rel="noreferrer"
			target="_blank"
		>
			{children}
		</Link>
	);
}

function Contents() {
	return (
		<div className={styles.wikiContents}>
			<h4>Contents</h4>
			<ol>
				<li>
					<Link to="#earlylife">Early Life</Link>
				</li>
				<li>
					<Link to="#appearance">Appearance</Link>
				</li>
				<li>
					<Link to="#behavior">Behavior</Link>
					<ol>
						<li>
							<Link to="#feedinghabits">Feeding habits</Link>
						</li>
						<li>
							<Link to="#beingheld">Being held</Link>
						</li>
					</ol>
				</li>
				<li>
					<Link to="#death">Death</Link>
				</li>
				<li>
					<Link to="#gallery">Gallery</Link>
				</li>
			</ol>
		</div>
	);
}

function GalleryPic({ src }: { src: string }) {
	return (
		<div className={styles.wikiGalleryPic}>
			<img src={src} alt={"moo moo"} />
		</div>
	);
}

export default function Cat() {
	const { colorTheme } = useContext(DarkModeContext);

	return (
		<MainLayout heading="cat wiki :3">
			<div className={`${styles.cat} ${styles[colorTheme]}`}>
				<div className={styles.catWikiHeader}>
					<h2>Maestro (cat)</h2>
				</div>
				<div className={styles.catWikiContent}>
					<div className={styles.catWikiInfo}>
						<h4>Maestro</h4>
						<div className={styles.catWikiInfoBox}>
							<img
								src={"https://assets.hellogirls.info/moo/15.jpg"}
								alt="moo moo on her 3rd birthday"
								width={271}
								height={203}
							/>
							<div className={styles.catWikiBoxCaption}>
								Maestro on her third birthday in 2021
							</div>
							<table className={styles.catWikiBoxTable}>
								<tr>
									<th className={styles.catWikiTableLabel}>Other name(s)</th>
									<td>Moo Moo</td>
								</tr>
								<tr>
									<th className={styles.catWikiTableLabel}>
										<WikiLink href="Species">Species</WikiLink>
									</th>
									<td>
										<em>
											<WikiLink href="Cat">Felis Catus</WikiLink>
										</em>
									</td>
								</tr>
								<tr>
									<th className={styles.catWikiTableLabel}>Sex</th>
									<td>Female</td>
								</tr>
								<tr>
									<th className={styles.catWikiTableLabel}>Born</th>
									<td>
										{dayjs(MOOMOO_DAY).format("MMMM D, YYYY")}
										<br />
										<WikiLink href="St._Louis">St. Louis, MO</WikiLink>, US
									</td>
								</tr>
								<tr>
									<th className={styles.catWikiTableLabel}>Died</th>
									<td>
										{dayjs(MOOMOO_DEATH).format("MMMM D, YYYY")} (aged{" "}
										{dayjs(MOOMOO_DEATH).diff(MOOMOO_DAY, "years")})<br />
										<WikiLink href="Chicago">Chicago, IL</WikiLink>, US
									</td>
								</tr>
								<tr>
									<th className={styles.catWikiTableLabel}>Occupation</th>
									<td>Professional cat</td>
								</tr>
								<tr>
									<th className={styles.catWikiTableLabel}>Known for</th>
									<td>Being a cute little sweetie pie</td>
								</tr>
							</table>
						</div>
					</div>

					<p>
						Maestro ({dayjs(MOOMOO_DAY).format("MMMM D, YYYY")} -{" "}
						{dayjs(MOOMOO_DEATH).format("MMMM D, YYYY")}), more commonly known
						as Moo Moo, was a female{" "}
						<WikiLink href="Bicolor_cat">black &amp; white</WikiLink>{" "}
						<WikiLink href="Domestic_short-haired_cat">
							domestic short-hair
						</WikiLink>{" "}
						cat who lived with the owner of this website, Son. Maestro is a
						popular cat among Son&apos;s friends who was known for her cow-like
						pattern, having a squeaky and chirpy meow, and little legs.
					</p>

					<Contents />

					<h3 id="earlylife">Early Life</h3>
					<p>
						Maestro was a stray cat for two years prior to being taken in by a
						local shelter in St. Louis in October of 2020. When she was brought
						to the shelter, Maestro was diagnosed with a respiratory illness and
						received treatment for a month. It is theorized that this illness
						affected her ability to meow properly.
					</p>

					<h3 id="appearance">Appearance</h3>
					<p>
						Maestro was a bicolor black and white cat with a mask &amp; mantle
						pattern. She had green eyes and a cute, pink nose. Maestro&apos;s
						back and tail mostly mostly black in coloring while her belly was
						white and fuzzy. She had patches of black fur on her arms, right
						above her paws, that resembled a bracelet. Her left metacarpal and
						metacarsal paw pads were black while her right ones were pink, her
						digital pads were pink as well. Maestro&apos;s legs and tail were
						shorter than the average cat, although her legs weren&apos;t as
						short as a munchkin&apos;s and her tail wasn&apos;t as short as a
						bobtail cat&apos;s.
					</p>
					<p>
						Maestro was most commonly seen wearing a pink bowtie collar with a
						bell attached. The color of the bell complimented her green eyes and
						pink little nose. Son&apos;s mom and roommate always suggests
						getting her a different colored collar but it just didn&apos;t hit
						the same.
					</p>
					<h3 id="behavior">Behavior</h3>
					<p>
						Maestro was a very well-behaved cat. She loved people and did not
						scratch or bite anyone (minus Son and anyone who lived with her),
						although she hid from those with large shoes and loud voices.
						Maestro was also affectionate and clingy. She enjoyed following Son
						around for no reason and took naps in Son&apos;s lap.
					</p>
					<h4 id="feedinghabits">Feeding habits</h4>
					<p>
						Maestro became much more lively when meal time approached. When Son
						woke up each morning, Maestro walked all over her, chirped
						excessively, and even attempted to remove Son&apos;s blanket off
						him. After Maestro ate breakfast, she calmed. Although, before
						laying down for a nap, she acquired zoomies and ran around the
						apartment, letting out a loud, gutteral meow as she did. Before
						dinner, Maestro would follow Son around the apartment and squeak at
						her. Son set up an alarm that went off whenever it was dinner time
						and when Maestro heard it she became energized, chirping much more
						than she usually did because she was excited for food.
					</p>
					<h4 id="beingheld">Being held</h4>
					<p>
						Even though Maestro was the perfect size to be held like a baby, she
						did not enjoy being carried. If someone attempted to carry her, she
						would get uncomfortable and forced her way out of their arms.
					</p>
					<h3 id="death">Death</h3>
					<p>
						Maestro was diagnosed with stage one kidney disease in February 2026
						after a vet appointment to check on her eye. She entered kidney
						failure in late May of 2026 and eventually succumbed to it on July
						13th, 2026.
					</p>
					<p>
						Her euthanasia was originally planned for June 2nd, 2026, but Son
						worked very hard to treat her with fluid treatments and medication,
						which allowed Maestro to survive for another month.
					</p>
					<p>
						Three years after this website was originally published, Son is very
						glad she put effort into this website to memorialize Maestro&apos;s
						life.{" "}
					</p>
					<h3 id="gallery">Gallery</h3>
					<div className={styles.wikiGallery}>
						{Array.from({ length: 10 }, (_, i) => i + 1).map(
							(index: number) => (
								<GalleryPic
									key={index}
									src={`https://assets.hellogirls.info/moo/${index}.jpg`}
								/>
							),
						)}
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
