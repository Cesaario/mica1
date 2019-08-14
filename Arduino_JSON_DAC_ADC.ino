#include <ArduinoJson.h>
#include <driver/dac.h>

StaticJsonDocument<200> docDAC;
int dt1 = 100;
int tempoAtual1 = millis();
int tempoAlvo1 = tempoAtual1 + dt1;

int dt2 = 250;
int tempoAtual2 = millis();
int tempoAlvo2 = tempoAtual2 + dt2;

void setup() {
  Serial.begin(115200);
  dac_output_enable(DAC_CHANNEL_1);
}

void loop() {
  tempoAtual1 = millis();
  tempoAtual2 = millis();
  
  if(tempoAtual1 >= tempoAlvo1){
    tempoAlvo1 = tempoAlvo1 + dt1;
    if (Serial.available() > 0) {
      String dadoRecebido = Serial.readStringUntil('$');
      DeserializationError error = deserializeJson(docDAC, dadoRecebido);
      if (error) return;
      String tipo = docDAC["tipo"];
      if (tipo == "dac") {
  
        int pino = docDAC["pino"];
        double valor = docDAC["valor"];
  
        int saida = mapear(valor);
        int pinoSaida = 0;
  
        if (pino == 0) {
          dac_output_voltage(DAC_CHANNEL_1, saida);
        } else if (pino == 1) {
          dac_output_voltage(DAC_CHANNEL_2, saida);
        }
      }
    }
  }

  if(tempoAtual2 >= tempoAlvo2){
    tempoAlvo2 = tempoAlvo2 + dt2;
    
    int leitura6 = analogRead(34);
    const int capacity = JSON_OBJECT_SIZE(3);
    StaticJsonDocument<capacity> docADC;
    char output[128];
    
    docADC["tipo"] = "adc";
    docADC["pino"] = 6;
    docADC["valor"] = leitura6;
  
    serializeJson(docADC, Serial);
  }
}

int mapear(float val) {
  int ret = (int) (val * 255);
  return ret;
}
