function SharedLogger(module: string) {
  this.module = module;
  this.messageCount = 0;
  this.messages = [];
}

// Initialize shared state on the prototype
SharedLogger.prototype.sharedMessageCount = 0;
SharedLogger.prototype.sharedMessages = [];

// Instance-specific method
SharedLogger.prototype.insertLog = function (log: string) {
  // Update instance-specific state
  this.messages.push(log);
  this.messageCount++;

  // Update shared state on the prototype
  this.constructor.prototype.sharedMessageCount++;
  this.constructor.prototype.sharedMessages.push(log);
};

// Method to view instance and shared state
SharedLogger.prototype.overAllActivity = function () {
  console.log(`Instance Activity for ${this.module}:`, {
    messages: this.messages,
    messageCount: this.messageCount,
  });

  console.log("Shared Activity:", {
    sharedMessages: this.constructor.prototype.sharedMessages,
    sharedMessageCount: this.constructor.prototype.sharedMessageCount,
  });

  return this.constructor.prototype.sharedMessages;
};

// Creating instances
const AuthLogger = new SharedLogger("Auth");
const UserLogger = new SharedLogger("User");

// Inserting logs
AuthLogger.insertLog("User logged in");
UserLogger.insertLog("User created");

console.log(AuthLogger.overAllActivity());
console.log(UserLogger.overAllActivity());
