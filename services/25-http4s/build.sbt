name := "25-http4s"
version := "1.0.0"
scalaVersion := "3.4.2"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-ember-server" % "0.23.28",
  "org.http4s" %% "http4s-dsl"          % "0.23.28",
  "org.http4s" %% "http4s-circe"        % "0.23.28",
  "io.circe"   %% "circe-generic"       % "0.14.10",
  "org.typelevel" %% "cats-effect"      % "3.5.7",
  "org.scalameta" %% "munit"            % "1.0.3" % Test,
  "org.typelevel" %% "munit-cats-effect" % "2.0.0" % Test,
)

assembly / assemblyMergeStrategy := {
  case PathList("META-INF", _*) => MergeStrategy.discard
  case PathList("reference.conf") => MergeStrategy.concat
  case _ => MergeStrategy.first
}
assembly / assemblyJarName := "app.jar"
