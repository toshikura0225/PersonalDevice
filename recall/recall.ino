/*
  Blink
  Turns on an LED on for one second, then off for one second, repeatedly.
 
  This example code is in the public domain.
 */
 
// Pin 13 has an LED connected on most Arduino boards.
// give it
int led = 13;
// the setup routine runs once when you press reset:
void setup() {                
  // initialize the digital pin as an output.
  pinMode(led, OUTPUT);     
    Serial.begin(9600);
} 
int count = 0;
// the loop routine runs over and over again forever:
void loop() {
    
if (Serial.available() > 0) { // 受信したデータが存在する
		int incomingByte = Serial.read(); // 受信データを読み込む

		 Serial.write(incomingByte); // 1バイトのデータ(45)を送信
	}
    
    
    if (count == 0)
    {
        digitalWrite(led, HIGH);
    }
    else if (count >= 10000)
    {
        digitalWrite(led, LOW);
        count = -10000;
    }
    count++;
}
