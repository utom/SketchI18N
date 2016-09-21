var onRun = function(context) {
    var manager,
        doc = context.document,
        command = context.command,
        identifier = command.identifier(),
        resourcesPath = command.pluginBundle().url().path(),
        macOSVersion =  Number(NSDictionary.dictionaryWithContentsOfFile("/System/Library/CoreServices/SystemVersion.plist").objectForKey("ProductVersion")),
        language = NSUserDefaults.standardUserDefaults().objectForKey("AppleLanguages").objectAtIndex(0),
        language = (macOSVersion >= 10.12)? language.split("-").slice(0, -1).join("-"): language,
        languagePath = resourcesPath + "/Contents/Resources/i18n/" + language + ".json";

    if (NSFileManager.defaultManager().fileExistsAtPath(languagePath)) {
        var mocha = Mocha.sharedRuntime();
        i18n = NSString.stringWithContentsOfFile_encoding_error(languagePath, NSUTF8StringEncoding, nil);

        if (!NSClassFromString("SketchI18NPluginManager")) {
            mocha.loadFrameworkWithName_inDirectory("SketchI18NPlugin", resourcesPath + "/Contents/Resources");
            manager = SketchI18NPluginManager.manager();
            manager.loadStrings(i18n);
        } else {
            manager = SketchI18NPluginManager.manager();
        }
        if (identifier == "i18n-toggle-command") {
            manager.toggle();
        } else {
            manager.run();
        }
    }
}
