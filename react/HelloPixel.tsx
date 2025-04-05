import { usePixel } from "vtex.pixel-manager";

const HelloPixel = () => {
  const settings = usePixel();
  const message = settings?.message || "Hola mundo (valor por defecto)";

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#e3f2fd",
        borderRadius: "8px",
        textAlign: "center",
        margin: "1rem auto",
        maxWidth: "500px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>{message}</h2>
    </div>
  );
};

export default HelloPixel;
