import { Barstats } from "@/components/commons/graficos/barstats/Barstats";
import { Circularstats } from "@/components/commons/graficos/circularstats/Cirularstats";
import { Scalastats } from "@/components/commons/graficos/scalastats/Scalastats";
import styles from "./page.module.scss";

const circularStats = {
  label: "",
  borderWidth: 1,
  data: [
    {
      label: "string",
      valor: 1,
      backgroundColor: "red",
      borderColor: "blue",
    },
    {
      label: "string",
      valor: 1,
      backgroundColor: "#6201EE",
      borderColor: "brown",
    },
    {
      label: "string",
      valor: 1.5,
      backgroundColor: "green",
      borderColor: "green",
    },
    {
      label: "string",
      valor: 2,
      backgroundColor: "yellow",
      borderColor: "black",
    },
    {
      label: "string",
      valor: 2,
      backgroundColor: "#29C0B1",
      borderColor: "black",
    },
  ],
};

const barStats = {
  labels: ["string", "string", "string"],
  datasets: [
    {
      label: "string",
      data: [2, 2, 3],
      backgroundColor: "red",
    },
    {
      label: "string",
      data: [1, 2, 3],
      backgroundColor: "blue",
    },
    {
      label: "string",
      data: [1, 2, 3],
      backgroundColor: "yellow",
    },
  ],
};

const scalastats = {
  label: "string",
  info: [
    {
      name: "string",
      cantidad: 1,
    },
    {
      name: "string",
      cantidad: 2,
    },
    {
      name: "string",
      cantidad: 1,
    },
    {
      name: "string",
      cantidad: 3,
    },
    {
      name: "string",
      cantidad: 1.5,
    },
  ],
  borderColor: "red",
  backgroundColor: "red",
};

export default function Home() {
  return (
    <div className={styles.comercial}>
      <div className={styles.stats}>
        <Circularstats circular={circularStats} />
        <Barstats bar={barStats} />
        <Scalastats scala={scalastats} />
      </div>
    </div>
  );
}
