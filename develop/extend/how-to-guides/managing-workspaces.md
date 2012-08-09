<properties linkid="dev-nodejs-how-to-blob-storage" urldisplayname="Blob Service" headerexpose="" pagetitle="How to Use the Blob Service from Node.js" metakeywords="Azure unstructured data Node.js, Azure unstructured storage Node.js, Azure blob Node.js, Azure blob storage Node.js" footerexpose="" metadescription="Learn how to use the Windows Azure blob service to upload, download, list, and delete blob content from your Node.js application." umbraconavihide="0" disquscomments="1"></properties>

# How to manage Workspaces

This guide will demonstrate how to use the WebMatrix SDK to manage different workspaces in WebMatrix.   There are four workspaces in WebMatrix that identify major areas of the application:


## Developer Workspaces

1. **Site**
	
	The Site workspace helps you monitor web requests and configure website settings. To access this workspace, select Site in the workspace selector in the lower left corner of WebMatrix. When WebMatrix is first installed, the Site Workspace is the default workspace. You can change the starting workspace in the Options dialog of the File menu.

2. **Editor**

	The Editor workspace contains the area where develoers are going to spend most of their time.  This includes the file tree, the code editing area, and the task panel.  

3. **Database**
	
	The WebMatrix Databases workspace makes data manipulation simple. It allows you to manage MySQL, SQL Server, and SQL Server Compact databases through the same interface—you don't have to learn a different tool for each database type. Here is a list of the main database tasks that you can perform with WebMatrix. The list is followed by step-by-step instructions for each task.

4. **Reports**
	
	The Reports workspace lets you run site analysis reports and review any errors found by WebMatrix. This helps you optimize your website for search engines, improve the performance of your site, and more. To access this workspace, click Reports in the workspace selector of WebMatrix.



## Detecting when a workspace has changed

When users change workspaces, that generally means they are moving on to work on a differnet part of their site.  Oftentimes, you want to show a different set of icons in the ribbon in different workspaces.  For example, in the database workspace, the user is presented with icons specific to managing databases:

![the database workspace](../media/database-ribbon.png)

To get started handling events, you need to add an event handler in the overridden `Initialize` method of the `Extension` class:


	protected override void Initialize(IWebMatrixHost host, ExtensionInitData data)
	{
		// Get new values
		_host = host;
		if (host != null)
		{
			host.WorkspaceChanged += 
					new EventHandler<WorkspaceChangedEventArgs>(WebMatrixHost_WorkspaceChanged);
			...                       
		}
	}


The `Initialize` method is called both when the extension is installed, and every time the extension is loaded in WebMatrix.  The `WorkspaceChanged` event will provide you with the current workspace, which can be used to cusomtize your application.  For example, this snippet of code will ensure that a ribbon group is only visible while the user is in the editor workspace:


	private void WebMatrixHost_WorkspaceChanged(object sender, WorkspaceChangedEventArgs e)
	{
		myRibbonGroup.IsVisible = e.NewWorkspace is IEditorWorkspace;
	}


When the user switches to non-editor workspaces, the ribbon will not appear!



