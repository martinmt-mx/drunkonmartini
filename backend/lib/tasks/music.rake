namespace :music do
  desc "Descarga tus lanzamientos y créditos de producción (config/streaming.yml)"
  task sync: :environment do
    result = AppleMusicCatalog.sync!
    puts "Lado A: #{result[:releases]} lanzamientos, #{result[:tracks]} canciones"
    puts "Lado B: #{ProductionCredits.sync!} créditos de producción"
  end
end
