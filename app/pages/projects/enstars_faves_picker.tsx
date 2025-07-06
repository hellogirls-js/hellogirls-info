import { DarkModeContext } from "@/contexts/DarkModeContext";
import MainLayout from "@/layouts/MainLayout";
import styles from "@/styles/FavesPicker.module.scss";
import { getData } from "@/utilities";
import { useListState, UseListStateHandlers } from "@mantine/hooks";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { twoStarIDs } from "@/data/twoStarIds";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/utility/Button";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
import {
  Group,
  Image as KonvaImage,
  Layer,
  Rect,
  Stage,
  Text,
} from "react-konva";
import Konva from "konva";
import useImage from "use-image";
import Color from "color";

export function links() {
  return new Array(85)
    .map((v, index) => index + 1)
    .filter((id) => twoStarIDs[id])
    .flatMap((id) => [
      {
        rel: "preload",
        as: "image",
        href: `https://assets.enstars.link/assets/card_full1_${twoStarIDs[id]}_"evolution".png`,
      },
      {
        rel: "preload",
        as: "image",
        href: `https://assets.enstars.link/assets/card_full1_${twoStarIDs[id]}_"normal".png`,
      },
    ]);
}

export async function MetaFunction() {
  return [{ title: "Enstars Favorites Picker" }];
}

export async function loader() {
  const CHARA_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
  const CHARA_DATA_JP_URL = "https://data.ensemble.moe/ja/characters.json";
  const UNIT_DATA_URL = "https://tl.data.ensemble.moe/en/units.json";
  const UNIT_DATA_JP_URL = "https://data.ensemble.moe/ja/units.json";
  const UNIT_TO_CHARA_URL =
    "https://data.ensemble.moe/ja/unit_to_characters.json";

  const jpUnitData = await getData<any>(UNIT_DATA_JP_URL);
  const unitData = await getData<ENUnitData>(UNIT_DATA_URL);
  const jpCharaData = await getData<JPCharacterData>(CHARA_DATA_JP_URL);
  const charaData = await getData<EnCharacterData>(CHARA_DATA_URL);
  const unitToChara = await getData<UnitToCharacter>(UNIT_TO_CHARA_URL);

  const unitDataWithColor: Array<
    ENUnitData & { image_color: string; order: number }
  > = unitData
    .sort((unitA, unitB) => {
      const correspondingJpDataA = jpUnitData.find((jp) => jp.id === unitA.id);
      const correspondingJpDataB = jpUnitData.find((jp) => jp.id === unitB.id);

      return (
        (correspondingJpDataA.order ?? 0) - (correspondingJpDataB.order ?? 0)
      );
    })
    .map((unit) => {
      const correspondingJpData = jpUnitData.find((jp) => jp.id === unit.id);

      return {
        ...unit,
        image_color: correspondingJpData.image_color,
        order: correspondingJpData.order,
      };
    });

  const sortedCharaData = charaData.sort((charaA, charaB) => {
    const correspondingCharaA = jpCharaData.find(
      (jp) => jp.character_id === charaA.character_id,
    );
    const correspondingCharaB = jpCharaData.find(
      (jp) => jp.character_id === charaB.character_id,
    );

    return (
      (correspondingCharaA?.sort_id ?? 0) - (correspondingCharaB?.sort_id ?? 0)
    );
  });

  return json({
    unitData: unitDataWithColor,
    charaData: sortedCharaData,
    unitToChara,
  });
}

export function HydrateFallback() {
  return (
    <MainLayout>
      <h2>Loading...</h2>
    </MainLayout>
  );
}

function FinalImageItem({
  charaId,
  x,
  y,
  setLoadedImages,
  unit,
  index,
}: {
  charaId: number;
  x: number;
  y: number;
  setLoadedImages: UseListStateHandlers<string>;
  unit: ENUnitData & { image_color: string; order: number };
  index: number;
}) {
  const [charaImage] = useImage(
    `/card_full1_${twoStarIDs[charaId]}_normal.png`,
  );
  const [unitImage] = useImage(`/unit_logo_border_${unit.id}.png`);

  useEffect(() => {
    if (charaImage) setLoadedImages.append(charaImage.src);
    if (unitImage) setLoadedImages.append(unitImage.src);
  }, [charaImage, unitImage]);

  const unitColor = Color(unit.image_color);

  return (
    <Group key={index} {...{ x, y }}>
      <Rect
        width={220}
        height={240}
        fillLinearGradientStartPoint={{ x: 110, y: 0 }}
        fillLinearGradientEndPoint={{ x: 110, y: 240 }}
        fillLinearGradientColorStops={[
          0,
          "#fff",
          1,
          unitColor.lighten(1.5).hex(),
        ]}
        cornerRadius={8}
        x={450}
        y={40}
      />
      <Group clip={{ width: 220, height: 240, x: 450, y: 40 }}>
        <KonvaImage
          image={unitImage}
          opacity={0.1}
          y={60}
          x={420}
          scale={{ x: 0.7, y: 0.7 }}
        />
        {charaId > 0 && <KonvaImage image={charaImage} x={-10} zIndex={1} />}
      </Group>
      <Rect
        width={220}
        height={240}
        stroke="#5764f7"
        strokeWidth={2}
        cornerRadius={8}
        x={450}
        y={40}
      />
      <Rect
        width={180}
        height={unit.id === 18 ? 56 : 32}
        fill="#5764f7"
        x={450}
        y={unit.id === 18 ? 224 : 248}
        cornerRadius={[0, 8, 0, 8]}
      />
      <Text
        width={180}
        text={unit.name.toUpperCase()}
        fill="white"
        fontSize={24}
        fontFamily="Raleway"
        x={460}
        y={unit.id === 18 ? 230 : 254}
      />
    </Group>
  );
}

function FinalImageCanvas({
  charaPicks,
  setImgSrc,
  unitData,
}: {
  charaPicks: number[];
  setImgSrc: Dispatch<SetStateAction<string | undefined>>;
  unitData: Array<ENUnitData & { image_color: string; order: number }>;
}) {
  const IMAGE_WIDTH = 1080;
  const IMAGE_HEIGHT = 1350;
  const canvasRef = useRef<Konva.Stage>(null);
  const [loadedImages, setLoadedImages] = useListState<string>([]);
  const [bgImage] = useImage("/triangle_bg.png");
  const bgImageRef = useRef<Konva.Image>(null);

  console.log({ charaPicks });

  const expectedLength =
    charaPicks.filter((id) => id > 0).length + unitData.length;

  console.table({
    expectedLength,
    loadedImagesLength: loadedImages.length,
    loadedImages,
  });

  useEffect(() => {
    if (canvasRef.current && loadedImages.length >= expectedLength) {
      canvasRef.current
        .toImage({
          callback: (img) => {
            setImgSrc(img.src);
          },
        })
        .catch(() => setImgSrc("ERROR"));
    }
  }, [canvasRef, loadedImages]);

  useEffect(() => {
    if (bgImage && bgImageRef.current) {
      setLoadedImages.append(bgImage.src);
      bgImageRef.current.cache();
    }
  }, [bgImage, bgImageRef]);

  return (
    <Stage ref={canvasRef} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}>
      <Layer>
        <Rect width={IMAGE_WIDTH} height={IMAGE_HEIGHT} fill="#f0f2ff" />
        <KonvaImage
          ref={bgImageRef}
          image={bgImage}
          rotation={-90}
          x={0}
          y={900}
          scale={{ x: 1.2, y: 1.2 }}
          globalCompositeOperation="color-burn"
        />
        <KonvaImage
          ref={bgImageRef}
          image={bgImage}
          rotation={-90}
          x={0}
          y={900}
          scale={{ x: 1.2, y: 1.2 }}
          globalCompositeOperation="color-burn"
          opacity={0.75}
        />
        <KonvaImage
          ref={bgImageRef}
          image={bgImage}
          rotation={90}
          x={900}
          y={500}
          scale={{ x: 1.2, y: 1.2 }}
          globalCompositeOperation="color-burn"
          opacity={0.5}
        />
      </Layer>
      <Layer>
        {charaPicks.map((charaId, index) => {
          return (
            <FinalImageItem
              key={index}
              {...{ charaId, setLoadedImages, index }}
              x={240 * (index % 4) - 380}
              y={250 * Math.floor((index + 1) / 4)}
              unit={unitData.filter((unit) => unit.order - 1 === index)[0]}
            />
          );
        })}
        <Group>
          <Text
            text="ENSEMBLE"
            height={200}
            x={60}
            y={1100}
            fontFamily="Raleway"
            fontSize={80}
            fill="#2634c9"
          />
          <Text
            text="STARS"
            height={200}
            x={500}
            y={1100}
            fontFamily="Raleway"
            fontSize={80}
            fill="#d4a10b"
          />
          <Text
            text="FAVES"
            width={250}
            height={200}
            x={60}
            y={1175}
            fontFamily="Raleway"
            fontSize={80}
            fill="#d46a8a"
          />
          <Text
            fontFamily="Raleway"
            text="made by son | https://hellogirls.info/projects/enstars-faves-picker"
            x={20}
            y={1320}
            fontSize={20}
            fill="#a9bdf5"
          />
        </Group>
      </Layer>
      {charaPicks.includes(74) && (
        <Layer>
          <Group width={240} height={240} x={800} y={20}>
            <Rect
              cornerRadius={16}
              width={240}
              height={240}
              fillLinearGradientStartPoint={{ x: 120, y: 0 }}
              fillLinearGradientEndPoint={{ x: 120, y: 240 }}
              fillLinearGradientColorStops={[0, "#ffdb63", 1, "#facd52"]}
              zIndex={10}
              shadowColor="#00000022"
              shadowBlur={8}
              shadowOffsetY={4}
            />
            <Text
              width={240}
              text="BADGE OF"
              align="center"
              fontSize={32}
              y={30}
              fill="#80510b"
              fontFamily="Raleway"
            />
            <Text
              width={240}
              text="GOOD TASTE!"
              align="center"
              fontSize={64}
              fill="#80510b"
              wrap="word"
              y={74}
              fontFamily="Raleway"
              fontWeight="bold"
            />
          </Group>
        </Layer>
      )}
    </Stage>
  );
}

function FinalImageModal({
  charaPicks,
  unitData,
  setOpenImageModal,
}: {
  charaPicks: number[];
  unitData: Array<ENUnitData & { image_color: string; order: number }>;
  setOpenImageModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [imgSrc, setImgSrc] = useState<string>();

  return (
    <div className={styles.imageModal}>
      <div className={styles.imageModalContent}>
        <div className={styles.imageModalHeader}>
          <h2>your favorite characters from each unit!</h2>
          <button onClick={() => setOpenImageModal(false)}>
            <IconX />
          </button>
        </div>
        <div className={styles.imageModalImageContainer}>
          {imgSrc === "ERROR" ? (
            <p>Could not load image :(</p>
          ) : imgSrc ? (
            <img src={imgSrc} />
          ) : (
            <p>Retrieving image...</p>
          )}
        </div>
      </div>

      <div style={{ visibility: "hidden" }}>
        <FinalImageCanvas {...{ charaPicks, setImgSrc, imgSrc, unitData }} />
      </div>
    </div>
  );
}

function CharaChoiceButton({
  setCharaPicks,
  unit,
  chara,
}: {
  setCharaPicks: UseListStateHandlers<number>;
  unit: ENUnitData & { order: number };
  chara: EnCharacterData;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      className={styles.charaChoice}
      onClick={() => {
        setCharaPicks.setItem(unit.order - 1, chara.character_id);
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <img
        src={`https://assets.enstars.link/assets/card_full1_${twoStarIDs[chara.character_id]}_${isHover ? "evolution" : "normal"}.png`}
        alt={chara.first_name}
      />
    </button>
  );
}

function ChoiceBox({
  charaPicks,
  setCharaPicks,
  charaData,
  unitToChara,
  unit,
  showCharaPopup,
  setShowCharaPopup,
}: {
  charaPicks: number[];
  setCharaPicks: UseListStateHandlers<number>;
  charaData: EnCharacterData[];
  unitToChara: UnitToCharacter[];
  unit: ENUnitData & { order: number };
  showCharaPopup: number | undefined;
  setShowCharaPopup: Dispatch<SetStateAction<number | undefined>>;
}) {
  const { colorTheme } = useContext(DarkModeContext);

  useEffect(() => {
    setShowCharaPopup(undefined);
  }, [charaPicks]);

  const charasInUnit = charaData.filter(
    (chara) =>
      // double face making this more complicated than it needs to be
      unitToChara
        .filter((uc) => uc.character_id === chara.character_id)
        .find((uc2) => uc2.unit_id === unit.id)?.unit_id === unit.id,
  );

  return (
    <div key={unit.id} className={styles.choiceBoxContainer}>
      <button
        className={styles.choiceBox}
        onClick={() => {
          if (showCharaPopup !== unit.id) setShowCharaPopup(unit.id);
          else setShowCharaPopup(undefined);
        }}
      >
        <div className={styles.choiceLabel}>{unit.name}</div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "150%",
            height: "150%",
            backgroundColor: colorTheme === "light" ? "white" : "#201c44",
            backgroundImage: `url("https://assets.enstars.link/assets/unit_logo_${unit.id}.png")`,
            backgroundSize: "50%",
            backgroundBlendMode: "luminosity",
            opacity: 0.05,
            transform: "rotate(15deg)",
          }}
        />
        {charaPicks[unit.order - 1] > 0 && (
          <img
            src={`https://assets.enstars.link/assets/card_full1_${twoStarIDs[charaPicks[unit.order - 1]]}_normal.png`}
            alt={`${unit.name} choice`}
          />
        )}
      </button>
      <AnimatePresence>
        {showCharaPopup === unit.id && (
          <motion.div
            key={unit.id}
            className={styles.choicesPopup}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {charasInUnit.map((chara) => (
              <CharaChoiceButton
                key={chara.character_id}
                {...{ setCharaPicks, chara, unit }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FavesPicker() {
  const { colorTheme } = useContext(DarkModeContext);
  const { unitData, charaData, unitToChara } = useLoaderData<typeof loader>();
  const [charaPicks, setCharaPicks] = useListState<number>(
    [...new Array(16)].map(() => 0),
  );
  const [openImageModal, setOpenImageModal] = useState(false);
  const [showCharaPopup, setShowCharaPopup] = useState<number>();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,800;1,800&display=swap"
        rel="stylesheet"
      />
      <MainLayout>
        <AnimatePresence>
          {openImageModal && (
            <motion.div
              className={clsx(styles.imageModalBG, styles[colorTheme])}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <FinalImageModal
                {...{ charaPicks, unitData, setOpenImageModal }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className={clsx(
            styles.container,
            styles[colorTheme],
            openImageModal && styles.modalOpen,
          )}
        >
          <h1>choose your favorite member from each unit!</h1>
          <p>
            click each box to select your favorite member from each unit. then,
            you can use these choices to choose your favorite member of each
            agency, and further narrow down your favorite overall character. hit
            the generate image button at the bottom to create an image with all
            your choices!
          </p>
          <div className={styles.choiceContainer}>
            {unitData.map((unit) => (
              <ChoiceBox
                key={unit.id}
                {...{
                  charaPicks,
                  setCharaPicks,
                  unit,
                  unitToChara,
                  charaData,
                  showCharaPopup,
                  setShowCharaPopup,
                }}
              />
            ))}
          </div>
          <Button
            icon={<IconDeviceFloppy />}
            value="generate image!"
            style={{ margin: "8vh auto 0% auto", width: "100%" }}
            buttonStyle={{
              width: "100%",
              justifyContent: "center",
              padding: "1% 0%",
              fontWeight: 600,
            }}
            onClick={() => setOpenImageModal(true)}
          />
        </div>
      </MainLayout>
    </>
  );
}
