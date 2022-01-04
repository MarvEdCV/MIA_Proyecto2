
<--reporte 4-->
SELECT EQUIPO.NOMBRE 
FROM COMPETICION 
JOIN EQUIPO ON EQUIPO.ID_EQUIPO = COMPETICION.EQUIPO_ID_EQUIPO 
WHERE COMPETICION.NOMBRE = 'compe1';


<--reporte 5-->
SELECT EQUIPO.NOMBRE 
FROM EQUIPO
WHERE EQUIPO.PAIS = 'Espania';


<--reporte 6-->
SELECT EQUIPO.NOMBRE 
FROM EQUIPO
WHERE trunc(months_between(to_date(to_char(SYSDATE, 'dd/mm/yyyy'), 'dd/mm/yyyy'), to_date(to_char(EQUIPO.FECHA_FUN , 'dd/mm/yyyy'), 'dd/mm/yyyy'))/12)=10;


<--reporte 7-->
SELECT ESTADIOS.NOMBRE 
FROM ESTADIOS 
WHERE ESTADIOS.PAIS ='Alemania';


<--reporte 8-->
SELECT ESTADIOS.NOMBRE 
FROM ESTADIOS 
WHERE ESTADIOS.CAPACIDAD <= 1200;



<--reporte 9 y 17-->
SELECT EQUI1.NOMBRE, EQUI2.NOMBRE, PARTIDO.RESULTADO 
FROM PARTIDO
JOIN EQUIPO EQUI1 ON EQUI1.ID_EQUIPO = PARTIDO.EQUIPO_ID_EQUIPO 
JOIN EQUIPO EQUI2 ON EQUI2.ID_EQUIPO = PARTIDO.EQUIPO_ID_EQUIPO2 
WHERE EQUI1.NOMBRE = 'Equipo1' OR EQUI2.NOMBRE = 'Equipo1';


<--reporte 12-->
SELECT JUGADOR.NOMBRE, PARTIDO_INCIDENCIAS.INCIDENCIA 
FROM JUGADOR 
JOIN PARTIDO_INCIDENCIAS ON PARTIDO_INCIDENCIAS.JUGADOR_ID_JUGADOR = JUGADOR.ID_JUGADOR;


<--reporte 15-->
SELECT EQUI1.NOMBRE, EQUI2.NOMBRE, PARTIDO.RESULTADO 
FROM PARTIDO
JOIN EQUIPO EQUI1 ON EQUI1.ID_EQUIPO = PARTIDO.EQUIPO_ID_EQUIPO 
JOIN EQUIPO EQUI2 ON EQUI2.ID_EQUIPO = PARTIDO.EQUIPO_ID_EQUIPO2 
WHERE EXTRACT(YEAR FROM PARTIDO.FECHA)=2021;



