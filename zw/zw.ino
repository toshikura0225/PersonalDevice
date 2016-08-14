const byte EOT = 0x04U;
const byte ENQ = 0x05U;

const byte STX = 0x02U;
const byte ETX = 0x03U;

char writeBuffer[] = "ZW   20.00,   30.64,0,   180,   180,  7.39,165.05, 30.63,     0, 13.80, 1.080, 2.487,     0,   480,    25,     0,   480,    25,0,0,2,0,E02,E02,E06,   ,   ,   ,   ,     0,     0,  0.00,  0.00,  0.00,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0, 0. 00, 0. 00, 0. 00,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,   0.0,0,   0.0,0,-44.42,0,0,0,0,1,0,0,0,0,0,   180,   180,     0,0,2,2,   180,   180,     0,0,2,2";

void setup() {
  // put your setup code here, to run once:

  // シリアルポートを9600 bps[ビット/秒]で初期化 
  Serial.begin(9600);
}

byte readLength = 0U;
const byte READ_BUFFER_SIZE = 20;
byte readBuffer[READ_BUFFER_SIZE];
void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available() > 0)
  {
    byte buf = Serial.read();
    if (buf == EOT)
    {
      readLength = 1U;
      readBuffer[0] = EOT;
    }
    else
    {
      readBuffer[readLength] = buf;
      readLength++;

      if(readLength >= READ_BUFFER_SIZE)
      {
        readLength = 0U;
      }
    }

    if(readLength >= 6U)
    {
      if(readBuffer[0] == EOT
          && readBuffer[1] == '0'
          && readBuffer[2] == '0'
          && readBuffer[3] == 'Z'
          && readBuffer[4] == 'W'
          && readBuffer[5] == ENQ)
      {

        readLength = 0U;

        delay(100);
        
        Serial.write(STX);
        Serial.print(writeBuffer);
        Serial.write(ETX);
        Serial.write('B');
  
      }
    }
  }
}
