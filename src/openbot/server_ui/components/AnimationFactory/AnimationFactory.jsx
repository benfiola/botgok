import { spring } from 'react-motion';

export class AnimationFactory {
    static FADE = "fade";
    static SLIDE = "slide";

    static generateProps(anim, props) {
        switch(anim) {
            case(this.FADE): return fade(props);
            case(this.SLIDE): return slide(props);
            default: return null;
        }
    }
}

function fade({stiffness = 60, damping = 15} = {}) {
    return {
        atEnter: {opacity: 0},
        atLeave: {opacity: spring(0, {stiffness, damping})},
        atActive: {opacity: spring(1, {stiffness, damping})}
    }
}

function slide({stiffness = 60, damping = 15} = {}) {
    return {
        atEnter: {_perc: 100},
        atLeave: {_perc: spring(-100, {stiffness, damping})},
        atActive: {_perc: spring(0, {stiffness, damping})},
        mapStyles: (style)=>{return {transform: `translate(${style._perc}%)`}}
    }
}
