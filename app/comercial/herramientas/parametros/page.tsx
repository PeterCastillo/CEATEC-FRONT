"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PML } from "@/components/comercial/herramientas/parametros/PML";
import { DDR } from "@/components/comercial/herramientas/parametros/DDR";
import { PDT } from "@/components/comercial/herramientas/parametros/PDT";
import { PDC } from "@/components/comercial/herramientas/parametros/PDC";
import { AP } from "@/components/comercial/herramientas/parametros/AP";

export default function Home() {
  const [step, setStep] = useState(2);

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <PDC />;
      case 2:
        return <DDR />;
      case 3:
        return <PML />;
      case 4:
        return <AP />;
      case 5:
        return <PDT />;
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Parámetros</span>
          <button className={styles.option}>VOLVER</button>
          <button className={styles.option}>DESHACER</button>
          <button className={styles.create}>
            <FaPlus /> GUARDAR
          </button>
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Parámetros de Cuentas
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Datos de Reportes
          </button>
          <button className={isStepActive(3)} onClick={() => setStep(3)}>
            Porcentajes, Montos y Longitudes
          </button>
          <button className={isStepActive(4)} onClick={() => setStep(4)}>
            Apariencia
          </button>
          <button className={isStepActive(5)} onClick={() => setStep(5)}>
            Parámetros de Ticket
          </button>
        </div>
      </div>
      <div className={styles.parametros}>{renderSteps()}</div>
    </>
  );
}
