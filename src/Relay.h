/*
 * File:   Relay.h
 * Author: yova
 *
 * Created on 3 de julio de 2017, 09:04 PM
 */

#ifndef RELAY_H
#define	RELAY_H

#include <bcm2835.h>
#include "./libraries/robotois-digital-header/DigitalHeader.h"

class Relay {
public:
    Relay(uint8_t _header);
    Relay(const Relay& orig);
    virtual ~Relay();

    void write(uint8_t state);

    void release();
private:
    DigitalHeader *IOHeader;
};

#endif	/* RELAY_H */
