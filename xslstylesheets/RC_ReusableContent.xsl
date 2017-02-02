<xsl:stylesheet 
  version="1.0" 
  exclude-result-prefixes="x d xsl msxsl cmswrt"
  xmlns:x="http://www.w3.org/2001/XMLSchema" 
  xmlns:d="http://schemas.microsoft.com/sharepoint/dsp" 
  xmlns:cmswrt="http://schemas.microsoft.com/WebParts/v3/Publishing/runtime"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt">
  <xsl:param name="ItemsHaveStreams">
    <xsl:value-of select="'False'" />
  </xsl:param>
  <xsl:variable name="OnClickTargetAttribute" select="string('javascript:this.target=&quot;_blank&quot;')" />
  <xsl:variable name="ImageWidth" />
  <xsl:variable name="ImageHeight" />
    <xsl:template name="NoImage" match="Row[@Style='NoImage']" mode="itemstyle">
        <xsl:variable name="SafeLinkUrl">
            <xsl:call-template name="OuterTemplate.GetSafeLink">
                <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
            </xsl:call-template>
        </xsl:variable>
        <xsl:variable name="DisplayTitle">
            <xsl:call-template name="OuterTemplate.GetTitle">
                <xsl:with-param name="Title" select="@Title"/>
                <xsl:with-param name="UrlColumnName" select="'LinkUrl'"/>
            </xsl:call-template>
        </xsl:variable>
        <div class="item link-item">
            <xsl:call-template name="OuterTemplate.CallPresenceStatusIconTemplate"/>
            <div class="secondaryFooter">
                <xsl:value-of disable-output-escaping="yes" select="@Description" />
            </div>
        </div>
    </xsl:template>
  <xsl:template name="HiddenSlots" match="Row[@Style='HiddenSlots']" mode="itemstyle">
    <div class="SipAddress">
      <xsl:value-of select="@SipAddress" />
    </div>
    <div class="LinkToolTip">
      <xsl:value-of select="@LinkToolTip" />
    </div>
    <div class="OpenInNewWindow">
      <xsl:value-of select="@OpenInNewWindow" />
    </div>
    <div class="OnClickForWebRendering">
      <xsl:value-of select="@OnClickForWebRendering" />
    </div>
  </xsl:template>
</xsl:stylesheet>
