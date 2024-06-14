import {Batalla} from '../models/Batalla.js';
import { realizarAtaque } from './ataquesService.js';

export class batallaService{
    constructor(){
        this.batallasActivas = [];
    }

    crearBatalla(jugador1,jugador2){
        const batallaId =  Math.random().toString(36).substring(7);
        const batalla = new Batalla(jugador1,jugador2);
        this.batallasActivas[batallaId] = batalla;
        return batallaId;
    }

    obtenerBatalla(batallaId){
        return this.batallasActivas[batallaId];
    }

    ataque(batallaId, jugadorId, nombreMovimiento){
        const batalla = this.obtenerBatalla(batallaId);
        const atacante = batalla.jugador1.nombre === jugadorId ? batalla.jugador1 : batalla.jugador2;
        const defensor = batalla.getOponente(atacante);

        const atacanteActivo = atacante.getPokemonActivo();
        const defensorActivo = defensor.getPokemonActivo();

        const movimiento = atacanteActivo.movimientos.find(movimiento => movimiento.nombre === nombreMovimiento);
        if(movimiento.pp === 0){
            throw new Error('No hay PP suficientes para realizar el ataque');
        }
        if(!movimiento){
            throw new Error('El movimiento no existe');
        }

        const damage = realizarAtaque(atacanteActivo, defensorActivo, movimiento);
        const response = {damage, movimiento: movimiento.nombre, atacante: atacanteActivo.nombre, defensor: defensorActivo.nombre};

        if(defensorActivo.noqueado()){
            response.message = `${defensorActivo.nombre} ha sido noqueado`;
            if(defensor.pokemonesUtilizables()){
               const siguinetePokemon = defensor.cambiarPokemon();
               response.siguinetePokemon = `${defensor.nombre} ha cambiado a ${siguinetePokemon.nombre}`;
            }else{
                response.message = `${defensor.nombre} ha sido noqueado y no tiene mas pokemones`;
                response.ganador = atacante.nombre;
            }
        }
           
        return response;
    }
}