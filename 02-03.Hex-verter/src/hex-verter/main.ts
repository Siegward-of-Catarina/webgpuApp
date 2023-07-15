import { hex_lookup } from "./library/constants/lookups";
import { dec_to_binary, binary_to_hex } from "./library/convarsions";
import { group_binary } from "./library/formatting";

const decimal_input: HTMLInputElement = document.getElementById("decimalInput") as HTMLInputElement;
const conversion_button: HTMLElement = document.getElementById("convert-button") as HTMLElement;
const binary_step: HTMLElement = document.getElementById("binary-raw") as HTMLElement;
const grouped_binary_step: HTMLElement = document.getElementById("binary-grouped") as HTMLElement;
const grouped_hex_step: HTMLElement = document.getElementById("hexadecimal-grouped") as HTMLElement;
const hex_output: HTMLElement = document.getElementById("hexadecimal") as HTMLElement;

const click: () => void = () => {

  const binary: String = dec_to_binary(Number(decimal_input.value));
  binary_step.innerText = "binary: " + binary.valueOf();

  var tempStr: String = "grouped: ";
  const grouped_binary = group_binary(binary);
  for (let i = 0; i < grouped_binary.length; i++) {
    tempStr += grouped_binary[i] + " ";
  }
  grouped_binary_step.innerText = tempStr.valueOf();

  tempStr = "hex (grouped): ";
  for (let i: number = 0; i < grouped_binary.length; i++) {
    tempStr += String(binary_to_hex(grouped_binary[i])) + " ";
  }
  grouped_hex_step.innerText = tempStr.valueOf();

  tempStr = "final: 0x";
  for (let i: number = 0; i < grouped_binary.length; i++) {
    tempStr += String(hex_lookup[binary_to_hex(grouped_binary[i])]);
  }
  hex_output.innerText = tempStr.valueOf();
}

conversion_button.addEventListener("click", click);
