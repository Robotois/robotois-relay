/*
 * File:   Relay.cpp
 * Author: yova
 *
 * Created on 3 de Julio de 2017, 09:04 PM
 */

#include <cstdio>

#include "Relay.h"

Relay::Relay(uint8_t _header) {
    IOHeader = new DigitalHeader(_header, (uint8_t)AS_OUTPUT, (uint8_t)AS_OUTPUT);
}

Relay::Relay(const Relay& orig) {
}

Relay::~Relay() {
}


void Relay::write(uint8_t state){
    IOHeader->io1_write(state);
}

void Relay::release(){
    IOHeader->release();
    delete IOHeader;
    printf("[RelayModule] => Released\n");
}
