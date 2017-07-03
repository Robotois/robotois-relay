{
  "targets": [
    {
      "target_name": "RelayModule",
      "sources": [ "src/wrapper/RelayModule.cpp","src/wrapper/RelayWrapper.cpp",
      "src/Relay.cpp",
      "src/libraries/robotois-digital-header/DigitalHeader.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
