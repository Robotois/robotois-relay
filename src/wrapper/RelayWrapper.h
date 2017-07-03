#ifndef RELAYWRAPPER_H
#define RELAYWRAPPER_H

#include <node.h>
#include <node_object_wrap.h>
#include "../Relay.h"

class RelayWrapper : public node::ObjectWrap {
public:
  static void Init();
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);

private:
  explicit RelayWrapper(uint8_t _header);
  ~RelayWrapper();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void write(const v8::FunctionCallbackInfo<v8::Value>& args);

  static void release(const v8::FunctionCallbackInfo<v8::Value>& args);

  static v8::Persistent<v8::Function> constructor;

  Relay *relay;
};

#endif
