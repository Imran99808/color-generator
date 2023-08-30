/**
 * Date: 1-12-2022
 * Author: Emran Reza
 * Description: Color picker application with huge dom functionalities
 */


window.onload = () => {
	main();
	// /console.log(color.length)

	
};

const color_arr=[
	"#6e1a47",
	"#f3a143",
	"#ccf6d9",
	"#e45075",
	"#112976",
	"#b19ef7",
	"#6e1a47",
	"#f3a143",
	"#ccf6d9",
	"#e45075",
	"#112976",
	"#b19ef7",
	"#6e1a47",
	"#f3a143",
	"#ccf6d9",
	"#e45075",
	"#112976",
	"#b19ef7",
	"#6e1a47",
	"#f3a143",
	"#ccf6d9",
	"#e45075",
	"#112976",
	"#112976",
	
	
]
let color_arr2=[];

 // logical functiom

function generateRGBColor() {
	const red = Math.floor(Math.random() * 255);
	const green = Math.floor(Math.random() * 255);
	const blue = Math.floor(Math.random() * 255);
	
	return{
		red:addcode(red),
		greeen:addcode(green),
		blue:addcode(blue),
	}
}

function addcode(value){
	let count=value.toString(16);
	
	if(count.length<2){
	 count=`0${count}`;
	

	}
	return count
		
	
	
}


function valid(key){
	let a=key.charCodeAt(key.length-1);
     let count="";
	 if((a>=97&&a<=102)||(a>=48&&a<=57)){
	  if(key.length==3||key.length==6){
			  
		return count=key;
	  }
	 }
	 
	 return count;
	 
   }

 function convert(hex){
	
     const count=back(hex);

	return{
         red:count.k1,
         green:count.k2,
         blue:count.k3,
      };
   

	function back(value){
		if(value.length==6){
			return{
				k1:parseInt(value.slice(0,2),16),
				k2:parseInt(value.slice(2,4),16),
				k3:parseInt(value.slice(4),16),
			};
		}
		else{
			return{
				k1:parseInt(value.charAt(0),16),
				k2:parseInt(value.charAt(1),16),
				k3:parseInt(value.charAt(2),16),
			};
		}
	}
 }

//  main fuction all dom work this function
function main(){
	
let input=document.getElementById("input-hex");
const input1=document.getElementById("input-rgb");
const save_btn=document.getElementById("save");
const copy_btn=document.getElementById("copy");
const random_color=document.getElementById("generate-random-color");
const color_display=document.getElementById("color-display");
const red_slider=document.getElementById("color-slider-red-input");
const green_slider=document.getElementById("color-slider-green-input");
const blue_slider=document.getElementById("color-slider-blue-input");
const preset_color=document.getElementById("preset-colors");
const custom_color=document.getElementById("custom-colors");
const bgPreview=document.getElementById("bg-preview");
const fileInp=document.getElementById("bg-file-input");
const fileBtn =document.getElementById("bg-btn");
const sound=new Audio("./sound/pani.wav");

const customColor= localStorage.getItem("customColor");
	if(customColor){
     color_arr2=JSON.parse(customColor);
	 displayPresetColor(color_arr2,custom_color);
	}


 random_color.addEventListener("click",random_btn);
 save_btn.addEventListener("click",save);
 copy_btn.addEventListener("click",copy);
 input.addEventListener("keyup",keyup);
 red_slider.addEventListener("change",comon);
 green_slider.addEventListener("change",comon);
 blue_slider.addEventListener("change",comon);
 preset_color.addEventListener("click",preset_copy);
 custom_color.addEventListener("click",preset_copy);
 fileInp.addEventListener("change",change);
 fileBtn.addEventListener("click",click);
 fileBtn.nextElementSibling.addEventListener("click",dlt);
 document.getElementById("bg-size").addEventListener("change",common2);
 document.getElementById("bg-repeat").addEventListener("change",common2);
 document.getElementById("bg-position").addEventListener("change",common2);
 document.getElementById("bg-attachment").addEventListener("change",common2);




function preset_copy(e){
const event=e.target
if(event.className==="color-box"){
	navigator.clipboard.writeText(event.getAttribute("data-color"));
	
	sound.play();

}

}


     function random_btn(){
	            const hex=generateRGBColor()
	                const color=`${hex.red}${hex.greeen}${hex.blue}`;
	
	                        update_value(color);

	
 }
 function save(){
	
	const color=`#${input.value}`;
	if(color_arr2.includes(color)){
		alert("already in your list")
		return;
	}
	
  if(color_arr2.length<24 && color!="#"){
    color_arr2.unshift(color);
	localStorage.setItem("customColor",JSON.stringify(color_arr2));
  }
 
  displayPresetColor(color_arr2,custom_color);
 }

    function copy(){
	let  advalue=`#${valid(input.value)}`;
	    if(!document.getElementById("color-mode-hex").checked && advalue!="#"){
	                            advalue=input1.value;
	  }

           if(document.body.lastElementChild.classList.contains("toast-message")){
		         document.body.lastElementChild.remove();
 }
 if(advalue!="#"){
 navigator.clipboard.writeText(advalue);
   sidebar(advalue);
 }
 else{
   window.alert("please enter right value.");
 }
}


  function keyup(){
	
	let color=valid(this.value);
	// console.log(this.value.length==7)
	/* if(this.value.length==7 || color==""){
   console.log("hellow")
		 color=this.value.substring(0,this.value.length-1);
		
		 this.value=color;

	 }*/
	
	  console.log(color);
	   if(color!=""){
	   
	  update_value(color);
	   }
   
   }
  
  function comon(){
	const red=parseInt(red_slider.value);
	const green=parseInt(green_slider.value);
	const blue=parseInt(blue_slider.value);
	
	
	const color=`${addcode(red)}${addcode(green)}${addcode(blue)}`;
	
	
	 update_value(color);
}
	 
	 
function common2(){
	
	document.body.style.backgroundSize= document.getElementById("bg-size").value;
	document.body.style.backgroundRepeat= document.getElementById("bg-repeat").value;
	document.body.style.backgroundPosition= document.getElementById("bg-position").value;
	document.body.style.backgroundAttachment= document.getElementById("bg-attachment").value;

}


 function update_value(hex){

   const decimal =convert(hex);
 
    color_display.style.backgroundColor=`#${hex}`;
	 input.value=hex;
	input1.value=`rgb(${decimal.red}, ${decimal.green}, ${decimal.blue})`;

	if(document.body.lastElementChild.classList.contains("toast-message")){
		document.body.lastElementChild.remove();
	}
   document.getElementById("color-slider-red").innerText=decimal.red;
   red_slider.value=decimal.red;
   document.getElementById("color-slider-green").innerText=decimal.green;
   green_slider.value=decimal.green;
   document.getElementById("color-slider-blue").innerText=decimal.blue;
   blue_slider.value=decimal.blue;
 }
 function displayPresetColor(color,parent){
      let count="";
   for(let i=0;i<color.length;i++){
	const color_box=generate_colorbox(color[i]);
    //  parent.appendChild(color_box);
	count+=color_box;
   }
  parent.innerHTML=count;
 
 }

 function generate_colorbox(color){
	// const div=document.createElement('div');
	// div.className="color-box"
	// div.style.backgroundColor= color;
	// div.setAttribute("data-color",color);
	 const div=`<div class="color-box" data-color="${color}" style="background-color:${color}"></div>`;
	
	return div;
 }

 function sidebar(r){
	
	let div=document.createElement('div');
	div.innerText=r +"||"+"copy";
	div.className="toast-message toast-message-slide-in";
	 document.body.appendChild(div);

 }
displayPresetColor(color_arr,preset_color);
function click(){
	console.log(fileInp.value);
	 fileInp.click();
	
}
function change(event){
	
	const file=event.target.files[0];
	const imgUrl=URL.createObjectURL(file)
	console.log(bgPreview)
	console.log(imgUrl)
	bgPreview.style.background=`url(${imgUrl})`;
	document.body.style.background=`url(${imgUrl})`;
	fileBtn.nextElementSibling.style.display="block";
	 bgPreview.parentElement.nextElementSibling.firstElementChild.style.display="block";
	
	
}
function dlt(){
	bgPreview.style.background=null;
	document.body.style.background=null;
	fileBtn.nextElementSibling.style.display="none";
	bgPreview.parentElement.nextElementSibling.firstElementChild.style.display="none";
	fileInp.value="";
	
}

	
}











