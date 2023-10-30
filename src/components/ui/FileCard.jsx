import React from "react";
import {
  Card,
  Image,
  Text,
  useTheme,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import theme from "./collectionTheme";

function ImageCard({ index, file }) {
  const tokens = useTheme;

  return (
    <div>
      <ThemeProvider theme={theme} colorMode="dark">
        <Card
          key={index}
          padding={tokens.space.medium}
          maxWidth="180px"
          fontSize={tokens.fontSizes.xs}
        >
          <Image
            alt="Amplify logo"
            src={file.key}
            objectFit="initial"
            objectPosition="50% 50%"
            backgroundColor="initial"
            height="75%"
            width="75%"
            opacity="100%"
            onClick={() => alert("📸 Say cheese!")}
          />
          {/* <Text>{item.description}</Text> */}
        </Card>
      </ThemeProvider>
    </div>
  );
}

export default ImageCard;
