import ArrowButton from "./ArrowButton";

type Props = {
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export default function JoinButton({ size = "md", fullWidth = false }: Props) {
  return (
    <ArrowButton href="/join" size={size} fullWidth={fullWidth}>
      Join now
    </ArrowButton>
  );
}
