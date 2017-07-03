#include <node.h>
#include "RelayWrapper.h"

using namespace v8;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  RelayWrapper::NewInstance(args);
}

void InitAll(Handle<Object> exports, Handle<Object> module) {
  RelayWrapper::Init();
  NODE_SET_METHOD(module,"exports",CreateObject);
}

NODE_MODULE(RelayModule, InitAll)
