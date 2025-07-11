import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

type Props = {
  Name: string;
  Description: string;
  src: string;
};

export default function ActionAreaCard({ Name, Description, src }: Props) {
  if (!Name || !Description || !src) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={src}
          alt={Name}
          sx={{
            width: 80,
            height: 75,
            objectFit: "contain",
            margin: "auto",
            paddingTop: 2,
          }}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {Description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
