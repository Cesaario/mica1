import {bus} from '@/main'

export function definirBus(){
    bus.$on('iniciar', function(param){
        console.log(param)
    })
}