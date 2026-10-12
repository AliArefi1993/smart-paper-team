import type { Meta, StoryObj } from "@storybook/react-vite";
import { NaturalHourglass, TimerNaturalSand } from "../TimerNaturalSand";
const meta={title:"Proposals/Timer natural sand",component:TimerNaturalSand,args:{language:"both",width:"phone",theme:"light",state:"running",progress:42,reducedMotion:false},argTypes:{language:{control:"radio",options:["both","en","fa"]},width:{control:"radio",options:["phone","narrow","wide"]},theme:{control:"radio",options:["light","dark"]},state:{control:"radio",options:["ready","running","paused","completed"]},progress:{control:{type:"range",min:0,max:100,step:1}},reducedMotion:{control:"boolean"}}} satisfies Meta<typeof TimerNaturalSand>;
export default meta;type Story=StoryObj<typeof meta>;
export const Running:Story={};
export const Ready:Story={args:{state:"ready",progress:0}};
export const Paused:Story={args:{state:"paused",progress:42}};
export const Completed:Story={args:{state:"completed",progress:100}};
export const DarkPersian:Story={args:{theme:"dark",language:"fa",width:"narrow"}};
export const Wide:Story={args:{width:"wide"}};
export const ReducedMotion:Story={args:{reducedMotion:true}};
export const NearCompletion:Story={args:{progress:96}};

export const GeometryEndpoints:Story={render:()=> <main className="natural-preview"><div className="natural-layout">{([0,50,100] as const).map(progress=><figure key={progress}><div className="natural-object"><NaturalHourglass progress={progress} state={progress===0?"ready":progress===100?"completed":"paused"}/></div><figcaption style={{textAlign:"center"}}>{progress}% elapsed</figcaption></figure>)}</div></main>};
