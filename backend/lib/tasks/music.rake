namespace :music do
  desc "Descarga tus lanzamientos, créditos de producción y artistas recomendados (config/streaming.yml y config/scene.yml)"
  task sync: :environment do
    result = AppleMusicCatalog.sync!
    puts "Lado A: #{result[:releases]} lanzamientos, #{result[:tracks]} canciones"
    puts "Lado B: #{ProductionCredits.sync!} créditos de producción"
    puts "Escena: #{SceneSync.sync!} artistas recomendados"
  end
end
