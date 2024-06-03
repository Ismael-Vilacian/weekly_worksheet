import React, { useEffect, useState } from "react";
import { Chip } from "./chip.tsx";

interface Horario {
    horario: string;
}

interface DiaLetivo {
    dia: string;
    horarios: Horario[];
}

interface PropsSchedules {
    data: { diasLetivos: DiaLetivo[] };
}

export const Schedules: React.FC<PropsSchedules> = ({ data }) => {
    const [day, setDay] = useState<DiaLetivo | null>(null);

    useEffect(() => {
        if (data && data.diasLetivos && data.diasLetivos.length > 0) {
            setDay(data.diasLetivos[0]);
        }
    }, [data]);

    const alternateDay = (dia: DiaLetivo) => {
        
        setDay(dia);
    };

    return (
        <div className="schedules">
            {day &&
                <div className="schedules_tabs">
                    {data && data.diasLetivos && data.diasLetivos.map((dia) => {
                        return (
                            <div className={`schedules_tab ${day === dia ? 'schedules_tab-selected' : ''}`} onClick={() => alternateDay(dia)}>{dia.dia}</div>
                        );
                    })}
                </div>
            }

            <div className="chip-data">
                {day && day.horarios && day.horarios.map((horario) => {
                    
                    return (
                        <div className="chip-hour">
                            <Chip>{horario.horario}</Chip>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}